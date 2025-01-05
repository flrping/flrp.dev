import { NextResponse } from 'next/server';
import { projectsCache } from '@/lib/cache/impl/project';

export async function GET() {
    try {
        const projects = await projectsCache.get('projects');

        if (!projects) {
            return NextResponse.json({ projects: [] }, { status: 404 });
        }

        return NextResponse.json(projects.projects);
    } catch (error) {
        console.error(`Error fetching projects:`, error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}
