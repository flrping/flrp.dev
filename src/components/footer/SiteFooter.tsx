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
        <footer>
            <div className='container py-4'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='social-icons mb-3'>
                        {socialLinks.map(({ name, icon, link }) => (
                            <SocialIcon key={name} icon={icon} link={link} />
                        ))}
                    </div>
                    <small className='text-center opacity-50 m-0'>
                        Site by me. Built with Next.js, React, and Bootstrap.
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
