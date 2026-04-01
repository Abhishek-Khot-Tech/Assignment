"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./config/env");
const user_model_1 = require("./modules/users/user.model");
const transaction_model_1 = require("./modules/transactions/transaction.model");
const logger_1 = require("./utils/logger");
const categories = ['Salary', 'Freelance', 'Investments', 'Rent', 'Utilities', 'Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Travel'];
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
const randomAmount = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};
const seed = async () => {
    try {
        await mongoose_1.default.connect(env_1.env.MONGO_URI);
        logger_1.logger.info('Connected to MongoDB for seeding');
        // Clear existing data
        await user_model_1.User.deleteMany({});
        await transaction_model_1.Transaction.deleteMany({});
        logger_1.logger.info('Cleared existing data');
        // Create users
        const admin = await user_model_1.User.create({
            name: 'Admin User',
            email: 'admin@jpmorgan.com',
            password: 'admin123',
            role: 'admin',
            status: 'active',
        });
        const analyst = await user_model_1.User.create({
            name: 'Sarah Analyst',
            email: 'analyst@jpmorgan.com',
            password: 'analyst123',
            role: 'analyst',
            status: 'active',
        });
        const viewer = await user_model_1.User.create({
            name: 'John Viewer',
            email: 'viewer@jpmorgan.com',
            password: 'viewer123',
            role: 'viewer',
            status: 'active',
        });
        logger_1.logger.info('Created 3 users: admin, analyst, viewer');
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
        await transaction_model_1.Transaction.insertMany(transactions);
        logger_1.logger.info('Created 50 random transactions');
        logger_1.logger.info('✅ Seed completed successfully!');
        logger_1.logger.info('');
        logger_1.logger.info('Test Accounts:');
        logger_1.logger.info('  Admin:    admin@jpmorgan.com / admin123');
        logger_1.logger.info('  Analyst:  analyst@jpmorgan.com / analyst123');
        logger_1.logger.info('  Viewer:   viewer@jpmorgan.com / viewer123');
        process.exit(0);
    }
    catch (error) {
        logger_1.logger.error('Seed failed:', error);
        process.exit(1);
    }
};
seed();
//# sourceMappingURL=seed.js.map