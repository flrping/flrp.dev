'use client';

import useSWR from 'swr';
import { fetchLinks } from '@/lib/api/fetcher';
import SocialIcon from '../ui/SocialIcon';

const SiteFooter = () => {
    const { data } = useSWR('/api/links', () => fetchLinks());

    const socialLinks = [
        { name: 'GitHub', icon: 'github', link: data?.find((link) => link.name === 'GitHub')?.link || '#' },
        { name: 'LinkedIn', icon: 'linkedin', link: data?.find((link) => link.name === 'LinkedIn')?.link || '#' },
    ];

    return (
        <footer className='min-h-28 bg-(--surface) text-(--foreground) p-6 border-t border-(--border)'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex flex-col items-center'>
                    <div className='social-icons mb-3'>
                        {socialLinks.map(({ name, icon, link }) => (
                            <SocialIcon key={name} icon={icon} link={link} />
                        ))}
                    </div>
                    <small className='text-center opacity-50 m-0'>
                        Site by me. Built with Next.js, React, and Tailwind CSS.
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
