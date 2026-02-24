import Image from 'next/image';
import type { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Link href={`/project/${project.name}`} className='block h-full'>
            <div className='p-6 border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 dark:bg-neutral-800 bg-white h-full'>
                <div className='flex items-center justify-between'>
                    <h5 className='text-lg text-(--accent) uppercase'>{project.name}</h5>
                    {project.year && (
                        <span className='text-sm text-neutral-400 dark:text-neutral-500'>{project.year}</span>
                    )}
                </div>
                <p className='text-xs text-neutral-400 dark:text-neutral-500 mt-2'>{project.tags.join(', ')}</p>
                <p className='text-xs mt-1 text-black dark:text-white'>{project.stack.join(', ')}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
