import { NextResponse } from 'next/server';
import type { Project } from '@/types/generic';
import { Cache } from '@/lib/cache/cache';

const projectsCache = new Cache<Project[]>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
    loader: async () => {
        const projects = await import('@/assets/projects/projects.json');
        return projects.default;
    },
});

export async function GET() {
    const projects = await projectsCache.get('projects');
    return NextResponse.json(projects);
}
