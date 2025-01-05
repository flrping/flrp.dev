import Image from 'next/image';
import type { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Link href={`/project/${project.name}`} className='project-card'>
            <div>
                <div className='project-card-image-container'>
                    <Image
                        src={`/${project.name}_Banner.png`}
                        alt={`${project.name} Banner`}
                        height={160}
                        width={280}
                        loading='lazy'
                        className='project-card-image'
                    />
                </div>
                <h5 className='project-card-title'>{project.name}</h5>
                <h6 className='project-card-type'>{project.tags.join(', ')}</h6>
                <h6 className='project-card-stack'>{project.stack.join(', ')}</h6>
            </div>
        </Link>
    );
};

export default ProjectCard;
