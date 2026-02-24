import { postsCache } from '@/lib/cache/impl/post';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const cacheData = await postsCache.get('posts');

        if (!cacheData) {
            return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
        }

        const post = cacheData.postsById.get(slug);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error(`Error fetching post:`, error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
