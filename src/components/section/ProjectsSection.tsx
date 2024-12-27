import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import type { Project } from '@/types/generic';
import ProjectCard from '@/components/ui/ProjectCard';
import SkeletonProjectCard from '../ui/SkeletonProjectCard';

const ProjectsSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/api/projects')
            .then((response) => response.json())
            .then((data) => setProjects(data as Project[]))
            .finally(() => setIsLoading(false));
    }, []);

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
                    projects.map((project) => (
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
