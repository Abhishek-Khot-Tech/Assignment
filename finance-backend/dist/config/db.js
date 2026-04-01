"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.env.MONGO_URI);
        logger_1.logger.info('✅ MongoDB connected successfully');
    }
    catch (error) {
        logger_1.logger.error('❌ MongoDB connection failed:', error);
        logger_1.logger.warn('⚠️ Continuing without database - some features may not work');
        // Don't exit process, just continue without database
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on('disconnected', () => {
    logger_1.logger.warn('MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    logger_1.logger.error('MongoDB connection error:', err);
});
//# sourceMappingURL=db.js.map