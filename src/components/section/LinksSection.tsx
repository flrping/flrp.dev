import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@/types/generic';
import { Col, Container, Row } from 'react-bootstrap';
import LinkCard from '../ui/LinkCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';

const LinksSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [links, setLinks] = useState<Link[]>([]);
    const [itemsPerRow, setItemsPerRow] = useState(1);

    useEffect(() => {
        fetch('/api/links')
            .then((response) => response.json())
            .then((data) => setLinks(data as Link[]))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const updateItemsPerRow = () => {
            if (window.innerWidth >= 1400) setItemsPerRow(3);
            else if (window.innerWidth >= 768) setItemsPerRow(2);
            else setItemsPerRow(1);
        };

        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);
        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);

    return (
        <div className='bg-dark'>
            <Container id='links' style={{ paddingTop: '5rem', paddingBottom: '5rem', minHeight: '20vh' }}>
                <h3 className='text-center mb-5'>LINKS</h3>
                <Row xs={1} sm={1} md={2} xxl={3}>
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Col key={index} className='d-flex justify-content-center mb-4'>
                                <SkeletonLinkCard />
                            </Col>
                        ))
                    ) : (
                        links.map((link, index) => {
                            const isLastRow =
                                index >= Math.ceil(links.length / itemsPerRow) * itemsPerRow - itemsPerRow;
                            return (
                                <Col key={link.name} className='mb-4'>
                                    <LinkCard link={link} />
                                    {!isLastRow && <hr className='link-divider' />}
                                </Col>
                            );
                        })
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default LinksSection;
