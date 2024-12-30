import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from '@/components/ui/ProjectCard';
import SkeletonProjectCard from '../ui/SkeletonProjectCard';
import { fetchProjects } from '@/lib/api/fetcher';
import useSWR from 'swr';
import { Project } from '@/types/generic';

const ProjectsSection = () => {
    const { data, error, isLoading } = useSWR('/api/projects', fetchProjects);

    if (error) {
        return <div>Error fetching projects</div>;
    }

    return (
        <Container id='projects' style={{ paddingTop: '10rem', paddingBottom: '5rem', minHeight: '100vh' }}>
            <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={3}>
                {isLoading ? (
                    Array.from({ length: 9 }).map((_, index) => (
                        <Col key={index} className='d-flex justify-content-center mb-4'>
                            <SkeletonProjectCard />
                        </Col>
                    ))
                ) : (
                    data.map((project: Project) => (
                        <Col key={project.name} className='d-flex justify-content-center mb-4'>
                            <ProjectCard project={project} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default ProjectsSection;
