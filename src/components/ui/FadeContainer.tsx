import React, { useEffect } from "react";

import { useState } from "react";
import { Container } from "react-bootstrap";

interface FadeContainerProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const FadeContainer = ({ isLoading, children }: FadeContainerProps) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShouldRender(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <Container
            className='position-relative'
            style={{
                minHeight: 'calc(100vh - 112px)',
                opacity: shouldRender ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            {isLoading ? (
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <div className='spinner-border' role='status' />
                </div>
            ) : (
                children
            )}
        </Container>
    );
};

export default FadeContainer;
