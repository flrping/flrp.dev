'use server';

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Post } from '@/types/blog';

interface CacheData {
    posts: Post[];
    postsById: Map<string, Post>;
    lastUpdated: Date | null;
}

const cache: CacheData = {
    posts: [],
    postsById: new Map(),
    lastUpdated: null,
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function parseDirectoryDate(dir: string) {
    const [datePart, timePart] = dir.split('_');
    const [month, day, year] = datePart.split('-');
    const [hour, minute] = timePart.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
}

async function refreshCache(): Promise<CacheData> {
    try {
        const blogDir = path.join(process.cwd(), 'src/assets/blog');
        const directories = await fs.readdir(blogDir);

        directories.sort((a, b) => {
            const dateA = parseDirectoryDate(a);
            const dateB = parseDirectoryDate(b);
            return dateB.getTime() - dateA.getTime();
        });

        const posts = (
            await Promise.all(
                directories.map(async (dir) => {
                    try {
                        const detailsPath = path.join(blogDir, dir, 'details.json');
                        const contentPath = path.join(blogDir, dir, 'content.md');
                        const [detailsContent, content] = await Promise.all([
                            fs.readFile(detailsPath, 'utf-8'),
                            fs.readFile(contentPath, 'utf-8'),
                        ]);
                        const details = JSON.parse(detailsContent);
                        const date = parseDirectoryDate(dir);

                        return {
                            slug: details.slug,
                            title: details.title,
                            tags: details.tags,
                            date,
                            content,
                        };
                    } catch (error) {
                        console.warn(`Skipping post ${dir} due to missing files:`, error);
                        return null;
                    }
                }),
            )
        ).filter((post): post is Post => post !== null);

        // Update cache
        cache.posts = posts;
        cache.postsById = new Map(posts.map((post) => [post.slug, post]));
        cache.lastUpdated = new Date();

        return cache;
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return cache;
    }
}

async function getCachedData(): Promise<CacheData> {
    if (cache.posts.length === 0 || !cache.lastUpdated || cache.lastUpdated.getTime() < Date.now() - CACHE_DURATION) {
        return refreshCache();
    }
    return cache;
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const offset = (page - 1) * 10;

        const { posts } = await getCachedData();
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

export async function getPost(slug: string): Promise<Post | null> {
    try {
        const { postsById } = await getCachedData();
        return postsById.get(slug) || null;
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        return null;
    }
}
