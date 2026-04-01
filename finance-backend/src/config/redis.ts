import { logger } from '../utils/logger';

// In-memory token store (Redis fallback)
// In production, replace with ioredis
class InMemoryTokenStore {
  private store: Map<string, { value: string; expiresAt: number }> = new Map();

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(key, { value, expiresAt });
    logger.debug(`Token stored: ${key.substring(0, 20)}...`);
  }

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  // Cleanup expired tokens periodically
  startCleanup(intervalMs: number = 60000): void {
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
        logger.debug(`Cleaned ${cleaned} expired tokens`);
      }
    }, intervalMs);
  }
}

export const tokenStore = new InMemoryTokenStore();
tokenStore.startCleanup();
