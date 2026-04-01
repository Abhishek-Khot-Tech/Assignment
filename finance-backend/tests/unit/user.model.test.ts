import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../src/modules/users/user.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Model', () => {
  const validUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'viewer' as const,
  };

  it('should create a user with hashed password', async () => {
    const user = await User.create(validUser);
    expect(user.name).toBe(validUser.name);
    expect(user.email).toBe(validUser.email);
    expect(user.password).not.toBe(validUser.password);
    expect(user.role).toBe('viewer');
    expect(user.status).toBe('active');
    expect(user.deletedAt).toBeNull();
  });

  it('should hash password on save', async () => {
    const user = await User.create(validUser);
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(20);
  });

  it('should compare password correctly', async () => {
    const user = await User.create(validUser);
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
    const isWrong = await user.comparePassword('wrongpassword');
    expect(isWrong).toBe(false);
  });

  it('should enforce unique email', async () => {
    await User.create(validUser);
    await expect(User.create(validUser)).rejects.toThrow();
  });

  it('should require name and email', async () => {
    await expect(User.create({ password: 'test' })).rejects.toThrow();
  });

  it('should default role to viewer', async () => {
    const user = await User.create(validUser);
    expect(user.role).toBe('viewer');
  });

  it('should remove password from toJSON', async () => {
    const user = await User.create(validUser);
    const json = user.toJSON();
    expect(json.password).toBeUndefined();
    expect(json.__v).toBeUndefined();
  });
});
