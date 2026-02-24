import React, { useEffect } from 'react';
import { useState } from 'react';

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
        <div
            className='max-w-7xl mx-auto px-4 relative min-h-[calc(100vh-112px)]'
            style={{
                opacity: shouldRender ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            {isLoading ? (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='spinner-border' role='status' />
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default FadeContainer;
