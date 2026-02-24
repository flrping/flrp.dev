'use client';

import React, { useState } from 'react';

const SiteNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='py-5 fixed top-0 left-0 right-0 z-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'>
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
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SiteNavbar;
