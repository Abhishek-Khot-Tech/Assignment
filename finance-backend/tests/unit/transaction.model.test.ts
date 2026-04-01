import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Transaction } from '../../src/modules/transactions/transaction.model';
import { User } from '../../src/modules/users/user.model';

let mongoServer: MongoMemoryServer;
let userId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });
  userId = user._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Transaction.deleteMany({});
});

describe('Transaction Model', () => {
  const validTransaction = () => ({
    amount: 100.50,
    type: 'income' as const,
    category: 'Salary',
    date: new Date(),
    description: 'Monthly salary',
    notes: 'January 2025',
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  it('should create a transaction', async () => {
    const tx = await Transaction.create(validTransaction());
    expect(tx.amount).toBe(100.50);
    expect(tx.type).toBe('income');
    expect(tx.category).toBe('Salary');
    expect(tx.deletedAt).toBeNull();
  });

  it('should require amount, type, and category', async () => {
    await expect(
      Transaction.create({ createdBy: userId })
    ).rejects.toThrow();
  });

  it('should enforce positive amount', async () => {
    await expect(
      Transaction.create({ ...validTransaction(), amount: -10 })
    ).rejects.toThrow();
  });

  it('should enforce valid type enum', async () => {
    await expect(
      Transaction.create({ ...validTransaction(), type: 'invalid' })
    ).rejects.toThrow();
  });

  it('should soft delete by setting deletedAt', async () => {
    const tx = await Transaction.create(validTransaction());
    tx.deletedAt = new Date();
    await tx.save();
    expect(tx.deletedAt).toBeInstanceOf(Date);
  });
});
