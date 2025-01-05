import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@/types/link';
import { Col, Container, Row } from 'react-bootstrap';
import LinkCard from '../ui/LinkCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';
import { fetchLinks } from '@/lib/api/fetcher';
import useSWR from 'swr';

const LinksSection = () => {
    const [itemsPerRow, setItemsPerRow] = useState(1);

    const { data, error, isLoading } = useSWR('/api/links', fetchLinks);

    useEffect(() => {
        if (!data) return;
        const updateItemsPerRow = () => {
            if (window.innerWidth >= 1400) setItemsPerRow(3);
            else if (window.innerWidth >= 768) setItemsPerRow(2);
            else setItemsPerRow(1);
        };
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);
        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, [data]);

    if (error) {
        return <div>Error fetching links</div>;
    }

    return (
        <div style={{ backgroundColor: 'var(--background-secondary)' }}>
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
                        data?.map((link: Link, index: number) => {
                            const isLastRow = index >= Math.ceil(data.length / itemsPerRow) * itemsPerRow - itemsPerRow;
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
