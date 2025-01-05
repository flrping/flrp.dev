import { fetchProject } from '@/lib/api/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import FadeContainer from '../ui/FadeContainer';
import { Col, Row } from 'react-bootstrap';
import fullRemark from '@/lib/remark/fullRemark';
import Link from 'next/link';

const ProjectDetailsSection = () => {
    const { name } = useParams();
    const { data, error, isLoading } = useSWR(`/api/projects/${name}`, () => fetchProject(name as string));

    if (error) return <div>Error: {error.message}</div>;

    if (isLoading) {
        return (
            <div
                className='d-flex justify-content-center align-items-center'
                style={{ minHeight: 'calc(100vh - 112px)' }}
            >
                <div className='spinner-border' role='status'></div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <FadeContainer isLoading={isLoading}>
                <div className='project-details-container mt-5'>
                    <Row>
                        <h1 className='project-details-title'>{data?.name}</h1>
                        <Col className='project-details-col-left' md={3}>
                            <div className='project-details-meta'>
                                <h5>Stack</h5>
                                <p className='project-details-stack'>{data?.stack.join(', ')}</p>
                                <h5>Tags</h5>
                                <p className='project-details-tags'>{data?.tags.join(', ')}</p>
                            </div>
                            <div className='project-details-links mt-3'>
                                {data?.links.map((link) => (
                                    <Link
                                        className='project-details-link'
                                        key={link.name}
                                        href={link.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {link.name}
                                        <i className='fa-solid fa-arrow-up-right-from-square'></i>
                                    </Link>
                                ))}
                            </div>
                        </Col>
                        <Col className='project-details-col-right' md={9}>
                            <div className='project-details-body'>
                                {fullRemark(data?.description || '', `/api/projects/images`, {
                                    project: name as string,
                                })}
                            </div>
                        </Col>
                    </Row>
                </div>
            </FadeContainer>
        </div>
    );
};

export default ProjectDetailsSection;
