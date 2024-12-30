import { NextResponse } from 'next/server';
import { postsCache } from '@/lib/cache/impl/post';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const offset = (page - 1) * 10;

        const cacheData = await postsCache.get('posts');

        if (!cacheData) {
            return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
        }

        const { posts } = cacheData;
        const paginatedPosts = posts.slice(offset, offset + 10);

        return NextResponse.json({
            posts: paginatedPosts,
            total: posts.length,
            page,
            totalPages: Math.ceil(posts.length / 10),
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}