import Image from 'next/image';
import type { Project } from '@/types/generic';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className='project-card'>
            <Image src={`/${project.name}_Banner.png`} alt={`${project.name} Banner`} height={160} width={280} loading='lazy' />
            <a className='project-card-title' href={project.link} target='_blank'>
                <h5>{project.name}</h5>
            </a>
            <h6 className='project-card-type'>{project.tags.join(', ')}</h6>
            <h6 className='project-card-stack'>{project.stack.join(', ')}</h6>
        </div>
    );
};

export default ProjectCard;
