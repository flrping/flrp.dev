import Image from 'next/image';
import type { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const formatDate = () => {
        if (project.year && project.month) {
            return new Date(project.year, project.month - 1).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
            });
        }
        if (project.year) return project.year.toString();
        return null;
    };

    return (
        <Link href={`/project/${project.name}`} className='block h-full'>
            <div className='p-6 border border-(--border) bg-(--surface) hover:bg-(--surface-elevated) h-full transition-colors flex flex-col'>
                <div className='flex items-center justify-between'>
                    <h5 className='text-lg text-(--accent) uppercase truncate'>{project.name}</h5>
                    {formatDate() && <span className='text-sm text-(--foreground-muted) shrink-0'>{formatDate()}</span>}
                </div>
                <p className='text-xs text-(--foreground-muted) mt-2 truncate'>{project.tags.join(', ')}</p>
                <p className='text-xs mt-1 text-(--foreground) truncate'>{project.stack.join(', ')}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
