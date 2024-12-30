import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { Cache } from '@/lib/cache/cache';

const imageCache = new Cache<Buffer>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const post = searchParams.get('post');

        if (!name || !post) {
            return NextResponse.json({ error: 'Missing directory or image name' }, { status: 400 });
        }

        const cacheKey = `${post}/${name}`;
        let imageData = await imageCache.get(cacheKey);

        if (!imageData) {
            const blogDir = path.join(process.cwd(), 'src/assets/blog');
            const postDir = path.join(blogDir, post as string);
            const imagePath = path.join(postDir, 'images', name as string);

            imageData = await fs.promises.readFile(imagePath);
            await imageCache.set(cacheKey, imageData);
        }

        return new NextResponse(imageData, {
            headers: { 'Content-Type': 'image/webp' },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
}
