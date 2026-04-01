import jwt, { SignOptions } from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { env } from '../../config/env';
import { tokenStore } from '../../config/redis';
import { User, IUser } from '../users/user.model';
import { ApiError } from '../../utils/ApiError';
import { RegisterInput, LoginInput } from './auth.schema';

const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

class AuthService {
  private generateAccessToken(user: IUser): string {
    // @ts-ignore
    return jwt.sign(
      { userId: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRY }
    );
  }

  private generateRefreshToken(user: IUser): string {
    // @ts-ignore
    return jwt.sign(
      { userId: user._id, type: 'refresh' },
      env.JWT_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRY }
    );
  }

  async register(data: RegisterInput) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'viewer',
    });

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await tokenStore.set(`refresh:${user._id}`, refreshToken, REFRESH_TOKEN_TTL);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginInput) {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw ApiError.unauthorized('Account is deactivated. Contact administrator.');
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await tokenStore.set(`refresh:${user._id}`, refreshToken, REFRESH_TOKEN_TTL);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorized('Refresh token is required');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, env.JWT_SECRET);
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    if (decoded.type !== 'refresh') {
      throw ApiError.unauthorized('Invalid token type');
    }

    const storedToken = await tokenStore.get(`refresh:${decoded.userId}`);
    if (!storedToken || storedToken !== refreshToken) {
      throw ApiError.unauthorized('Refresh token has been revoked');
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.status !== 'active') {
      throw ApiError.unauthorized('User not found or inactive');
    }

    const newAccessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    await tokenStore.set(`refresh:${user._id}`, newRefreshToken, REFRESH_TOKEN_TTL);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string) {
    await tokenStore.del(`refresh:${userId}`);
  }

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user.toJSON();
  }
}

export const authService = new AuthService();
