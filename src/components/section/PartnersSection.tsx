import { Col, Container, Row } from 'react-bootstrap';
import PartnerCard from '../ui/PartnerCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';
import useSWR from 'swr';
import { fetchPartners } from '@/lib/api/fetcher';
import { Partner } from '@/types/generic';

const PartnersSection = () => {
    const { data, error, isLoading } = useSWR('/api/partners', fetchPartners);

    if (error) {
        return <div>Error fetching partners</div>;
    }

    return (
        <Container id='partners' style={{ paddingTop: '5rem', paddingBottom: '5rem', minHeight: '20vh' }}>
            <h3 className='text-center mb-5'>PARTNERS</h3>
            <Row xs={1} sm={1} md={2} xxl={3}>
                {isLoading ? 
                    Array.from({ length: 3 }).map((_, index) => (
                        <Col key={index} className='d-flex justify-content-center mb-4'>
                            <SkeletonLinkCard />
                        </Col>
                    ))
                    : data.map((partner: Partner) => (
                        <Col key={partner.name} className='d-flex justify-content-center mb-4'>
                            <PartnerCard partner={partner} />
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default PartnersSection;
