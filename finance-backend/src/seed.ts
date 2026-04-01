import mongoose from 'mongoose';
import { env } from './config/env';
import { User } from './modules/users/user.model';
import { Transaction } from './modules/transactions/transaction.model';
import { logger } from './utils/logger';

const categories = ['Salary', 'Freelance', 'Investments', 'Rent', 'Utilities', 'Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Travel'];

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomAmount = (min: number, max: number) => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

const seed = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Transaction.deleteMany({});
    logger.info('Cleared existing data');

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@jpmorgan.com',
      password: 'admin123',
      role: 'admin',
      status: 'active',
    });

    const analyst = await User.create({
      name: 'Sarah Analyst',
      email: 'analyst@jpmorgan.com',
      password: 'analyst123',
      role: 'analyst',
      status: 'active',
    });

    const viewer = await User.create({
      name: 'John Viewer',
      email: 'viewer@jpmorgan.com',
      password: 'viewer123',
      role: 'viewer',
      status: 'active',
    });

    logger.info('Created 3 users: admin, analyst, viewer');

    // Create 50 random transactions
    const users = [admin, analyst];
    const transactions = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    for (let i = 0; i < 50; i++) {
      const type = Math.random() > 0.4 ? 'expense' : 'income';
      const category = type === 'income'
        ? ['Salary', 'Freelance', 'Investments'][Math.floor(Math.random() * 3)]
        : categories[Math.floor(Math.random() * categories.length)];

      transactions.push({
        amount: type === 'income' ? randomAmount(1000, 15000) : randomAmount(50, 5000),
        type,
        category,
        date: randomDate(startDate, endDate),
        notes: `Transaction #${i + 1} - ${category} ${type}`,
        description: `${type === 'income' ? 'Received' : 'Paid'} for ${category.toLowerCase()} services`,
        createdBy: users[Math.floor(Math.random() * users.length)]._id,
      });
    }

    await Transaction.insertMany(transactions);
    logger.info('Created 50 random transactions');

    logger.info('✅ Seed completed successfully!');
    logger.info('');
    logger.info('Test Accounts:');
    logger.info('  Admin:    admin@jpmorgan.com / admin123');
    logger.info('  Analyst:  analyst@jpmorgan.com / analyst123');
    logger.info('  Viewer:   viewer@jpmorgan.com / viewer123');

    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
