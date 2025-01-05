import { NextResponse } from 'next/server';
import { projectsCache } from '@/lib/cache/impl/project';

export async function GET(request: Request, { params }: { params: { name: string } }) {
    try {
        const cacheData = await projectsCache.get('projects');

        if (!cacheData) {
            return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
        }

        const project = cacheData.projectsByName.get(params.name);

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error(`Error fetching project:`, error);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}
