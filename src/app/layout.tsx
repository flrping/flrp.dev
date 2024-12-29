import type { Metadata } from 'next';
import '@/styles/globals.scss';
import React from 'react';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'flrp.dev',
    description: 'a developers portfolio.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <Script
                src='https://kit.fontawesome.com/baba299d4a.js'
                crossOrigin='anonymous'
                strategy='afterInteractive'
            />
            <body>{children}</body>
        </html>
    );
}
