declare class InMemoryTokenStore {
    private store;
    set(key: string, value: string, ttlSeconds: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    startCleanup(intervalMs?: number): void;
}
export declare const tokenStore: InMemoryTokenStore;
export {};
//# sourceMappingURL=redis.d.ts.map