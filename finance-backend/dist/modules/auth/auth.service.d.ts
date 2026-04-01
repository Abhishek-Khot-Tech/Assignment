import { IUser } from '../users/user.model';
import { RegisterInput, LoginInput } from './auth.schema';
declare class AuthService {
    private generateAccessToken;
    private generateRefreshToken;
    register(data: RegisterInput): Promise<{
        user: import("mongoose").FlattenMaps<IUser> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(data: LoginInput): Promise<{
        user: import("mongoose").FlattenMaps<IUser> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
    getMe(userId: string): Promise<import("mongoose").FlattenMaps<IUser> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map