'use client';

import React, { useEffect, useState } from 'react';

const SiteNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
            return;
        }

        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = systemPrefersDark ? 'dark' : 'light';

        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';

        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <nav className='py-5 fixed top-0 left-0 right-0 z-10 bg-(--surface) border border-(--border)'>
            <div className='max-w-7xl mx-auto px-[5%]'>
                <div className='flex items-center justify-between text-(--accent)'>
                    <a href='/' className='text-lg hover:opacity-80'>
                        FLRP.DEV
                    </a>
                    <button className='lg:hidden p-2' onClick={() => setIsOpen(!isOpen)} aria-label='Toggle navigation'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            {isOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            )}
                        </svg>
                    </button>
                    <div className='hidden lg:flex items-center gap-6'>
                        <a href='/' className='hover:opacity-80'>
                            HOME
                        </a>
                        <a href='/blog' className='hover:opacity-80'>
                            BLOG
                        </a>
                        <a
                            href='https://ko-fi.com/flrp'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:opacity-80'
                        >
                            DONATE
                        </a>
                        <button
                            type='button'
                            className='hover:opacity-80'
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className='lg:hidden mt-4 flex flex-col items-center gap-4'>
                        <a href='/' className='hover:opacity-80'>
                            HOME
                        </a>
                        <a href='/blog' className='hover:opacity-80'>
                            BLOG
                        </a>
                        <a
                            href='https://ko-fi.com/flrp'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:opacity-80'
                        >
                            DONATE
                        </a>
                        <button
                            type='button'
                            className='hover:opacity-80'
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SiteNavbar;
