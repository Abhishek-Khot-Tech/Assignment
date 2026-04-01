"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStore = void 0;
const logger_1 = require("../utils/logger");
// In-memory token store (Redis fallback)
// In production, replace with ioredis
class InMemoryTokenStore {
    constructor() {
        this.store = new Map();
    }
    async set(key, value, ttlSeconds) {
        const expiresAt = Date.now() + ttlSeconds * 1000;
        this.store.set(key, { value, expiresAt });
        logger_1.logger.debug(`Token stored: ${key.substring(0, 20)}...`);
    }
    async get(key) {
        const entry = this.store.get(key);
        if (!entry)
            return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.value;
    }
    async del(key) {
        this.store.delete(key);
    }
    async exists(key) {
        const value = await this.get(key);
        return value !== null;
    }
    // Cleanup expired tokens periodically
    startCleanup(intervalMs = 60000) {
        setInterval(() => {
            const now = Date.now();
            let cleaned = 0;
            for (const [key, entry] of this.store.entries()) {
                if (now > entry.expiresAt) {
                    this.store.delete(key);
                    cleaned++;
                }
            }
            if (cleaned > 0) {
                logger_1.logger.debug(`Cleaned ${cleaned} expired tokens`);
            }
        }, intervalMs);
    }
}
exports.tokenStore = new InMemoryTokenStore();
exports.tokenStore.startCleanup();
//# sourceMappingURL=redis.js.map