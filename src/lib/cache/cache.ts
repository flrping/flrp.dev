import { CacheEntry, CacheOptions, EvictionPolicy } from "@/types/cache";

export class Cache<T> {
    private cache: Map<string, CacheEntry<T>>;
    private maxSize: number;
    private ttl: number;
    private evictionPolicy: EvictionPolicy;
    private loader?: () => Promise<T>;
    private staleWhileRevalidate: boolean;
    private revalidateInterval: number;

    constructor(options: CacheOptions<T> = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 100;
        this.ttl = options.ttl || 1000 * 60 * 60;
        this.evictionPolicy = options.evictionPolicy || 'lru';
        this.loader = options.loader;
        this.staleWhileRevalidate = options.staleWhileRevalidate ?? false;
        this.revalidateInterval = options.revalidateInterval || 1000 * 60 * 5;
    }

    private evict(): void {
        if (this.cache.size <= this.maxSize) return;

        switch (this.evictionPolicy) {
            case 'lru': {
                let oldest: [string, CacheEntry<T>] | null = null;
                for (const entry of this.cache.entries()) {
                    if (!oldest || entry[1].lastAccessed < oldest[1].lastAccessed) {
                        oldest = entry;
                    }
                }
                if (oldest) {
                    this.cache.delete(oldest[0]);
                }
                break;
            }
            case 'time': {
                const now = Date.now();
                for (const [key, entry] of this.cache.entries()) {
                    if (now - entry.created > this.ttl) {
                        this.cache.delete(key);
                    }
                }
                break;
            }
            default:
                if (this.cache.size > this.maxSize) {
                    const firstKey = this.cache.keys().next().value;
                    this.cache.delete(firstKey);
                }
        }
    }

    async get(key: string): Promise<T | null> {
        const entry = this.cache.get(key);
        const now = Date.now();

        if (entry) {
            entry.lastAccessed = now;

            const shouldRevalidate =
                this.staleWhileRevalidate &&
                this.loader &&
                (!entry.lastRevalidated || now - entry.lastRevalidated >= this.revalidateInterval) &&
                !entry.isRevalidating;

            if (shouldRevalidate) {
                entry.isRevalidating = true;

                this.revalidate(key).catch((error) => {
                    console.error(`Error revalidating key ${key}:`, error);
                });
            }

            if (now - entry.created <= this.ttl || this.staleWhileRevalidate) {
                return entry.data;
            }

            this.cache.delete(key);
        }

        if (this.loader) {
            try {
                const data = await this.loader();
                await this.set(key, data);
                return data;
            } catch (error) {
                console.error(`Error loading data for key ${key}:`, error);
                return null;
            }
        }

        return null;
    }

    async set(key: string, data: T): Promise<void> {
        this.evict();

        this.cache.set(key, {
            data,
            lastAccessed: Date.now(),
            created: Date.now(),
            isRevalidating: false,
            lastRevalidated: null,
        });
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    private async revalidate(key: string): Promise<void> {
        if (!this.loader) return;

        try {
            const data = await this.loader();
            const entry = this.cache.get(key);

            if (entry) {
                entry.data = data;
                entry.lastRevalidated = Date.now();
                entry.isRevalidating = false;
            }
        } catch (error) {
            const entry = this.cache.get(key);
            if (entry) {
                entry.isRevalidating = false;
            }
            throw error;
        }
    }
}