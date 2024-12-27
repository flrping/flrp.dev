import { NextResponse } from 'next/server';
import type { Project } from '@/types/generic';

let projectsCache: Project[] = [];

async function getAllProjects() {
    if (projectsCache.length > 0) {
        return projectsCache;
    }

    try {
        const projects = await import('@/assets/projects/projects.json');
        projectsCache = projects.default;
        return projectsCache;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

export async function GET() {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
}
