import { Link } from '@/types/link';
import { NextResponse } from 'next/server';
import { Cache } from '@/lib/cache/cache';

const linksCache = new Cache<Link[]>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
    loader: async () => {
        const links = await import('@/assets/links/links.json');
        return links.default;
    },
});

export async function GET() {
    const links = await linksCache.get('links');
    return NextResponse.json(links);
}
