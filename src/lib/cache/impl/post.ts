import { Cache } from '@/lib/cache/cache';
import { PostsCacheData } from '@/types/cache';
import postLoader from '@/lib/cache/loaders/postLoader';

export const postsCache = new Cache<PostsCacheData>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
    loader: async () => postLoader(),
});