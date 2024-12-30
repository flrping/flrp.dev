type EvictionPolicy = 'lru' | 'time' | 'none';

export interface CacheOptions<T> {
    maxSize?: number;
    ttl?: number;
    evictionPolicy?: EvictionPolicy;
    loader?: () => Promise<T>;
    staleWhileRevalidate?: boolean;
    revalidateInterval?: number;
}

export interface CacheEntry<T> {
    data: T;
    lastAccessed: number;
    created: number;
    isRevalidating: boolean;
    lastRevalidated: number | null;
}

export interface PostsCacheData {
    posts: Post[];
    postsById: Map<string, Post>;
    lastUpdated: Date | null;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    page: number;
    totalPages: number;
}