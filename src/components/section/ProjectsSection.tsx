import ProjectCard from '@/components/ui/ProjectCard';
import SkeletonProjectCard from '../ui/SkeletonProjectCard';
import { fetchProjects } from '@/lib/api/fetcher';
import useSWR from 'swr';
import { Project } from '@/types/project';

const ProjectsSection = () => {
    const { data, error, isLoading } = useSWR('/api/projects', fetchProjects);

    if (error) {
        return <div>Error fetching projects</div>;
    }

    return (
        <div className='pt-30 pb-10'>
            <h1 className='text-center mb-5 text-(--accent) text-xl uppercase'>PROJECTS</h1>
            <div id='projects' className='max-w-7xl mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {isLoading
                        ? Array.from({ length: 9 }).map((_, index) => <SkeletonProjectCard key={index} />)
                        : data?.map((project: Project) => <ProjectCard key={project.name} project={project} />)}
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;
