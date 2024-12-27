import type { Metadata } from 'next';
import '@/styles/globals.scss';
import React from 'react';

export const metadata: Metadata = {
    title: 'flrp.dev',
    description: 'a developers blog.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}
