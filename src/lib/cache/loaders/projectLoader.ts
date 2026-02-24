'use server';

import path from 'path';
import fs from 'fs/promises';
import { Project } from '@/types/project';

const projectLoader = async () => {
    const projectDir = path.join(process.cwd(), 'src/assets/projects');
    const directories = await fs.readdir(projectDir);

    const projects = (
        await Promise.all(
            directories.map(async (dir) => {
                try {
                    const metadataPath = path.join(projectDir, dir, 'metadata.json');
                    const descriptionPath = path.join(projectDir, dir, 'description.md');

                    const [metadataContent, descriptionContent] = await Promise.all([
                        fs.readFile(metadataPath, 'utf-8'),
                        fs.readFile(descriptionPath, 'utf-8'),
                    ]);

                    const metadata = JSON.parse(metadataContent);
                    const description = descriptionContent;

                    return {
                        ...metadata,
                        description,
                    } as Project;
                } catch (error) {
                    console.error(`Error loading project ${dir}:`, error);
                    return null;
                }
            }),
        )
    ).filter((project): project is Project => project !== null);

    projects.sort((a, b) => {
        if (a.year !== b.year) {
            return (b.year ?? 0) - (a.year ?? 0);
        }
        if (a.month !== b.month) {
            return (b.month ?? 0) - (a.month ?? 0);
        }
        return a.name.localeCompare(b.name);
    });

    return {
        projects,
        projectsByName: new Map(projects.map((project) => [project.name, project])),
        lastUpdated: new Date(),
    };
};

export default projectLoader;
