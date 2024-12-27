import { useState } from 'react';

import { Partner } from '@/types/generic';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PartnerCard from '../ui/PartnerCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';

const PartnersSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        fetch('/api/partners')
            .then((response) => response.json())
            .then((data) => setPartners(data as Partner[]))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Container id='partners' style={{ paddingTop: '5rem', paddingBottom: '5rem', minHeight: '20vh' }}>
            <h3 className='text-center mb-5'>PARTNERS</h3>
            <Row xs={1} sm={1} md={2} xxl={3}>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <Col key={index} className='d-flex justify-content-center mb-4'>
                              <SkeletonLinkCard />
                          </Col>
                      ))
                    : partners.map((partner) => (
                          <Col key={partner.name} className='d-flex justify-content-center mb-4'>
                              <PartnerCard partner={partner} />
                          </Col>
                      ))}
            </Row>
        </Container>
    );
};

export default PartnersSection;
