import { NextResponse } from 'next/server';
import type { Partner } from '@/types/partner';
import { Cache } from '@/lib/cache/cache';

const partnersCache = new Cache<Partner[]>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
    loader: async () => {
        const partners = await import('@/assets/partners/partners.json');
        return partners.default;
    },
});

export async function GET() {
    const partners = await partnersCache.get('partners');
    return NextResponse.json(partners);
}
