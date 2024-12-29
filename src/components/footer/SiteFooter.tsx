'use client';

import { useEffect, useState } from "react";
import { Link } from "@/types/generic";

const SiteFooter = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/links')
            .then((response) => response.json())
            .then((data) => setLinks(data as Link[]))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <footer>
            <div className="container py-4">
                <div className="d-flex flex-column align-items-center">
                    <div className="social-icons mb-3">
                        {!isLoading && (
                            <>
                                <a href={links.find(link => link.name === 'GitHub')?.link} target="_blank" rel="noopener noreferrer" className="mx-2">
                                    <i className="fa-brands fa-github fs-4" style={{color: 'var(--foreground-muted)'}}></i>
                                </a>
                                <a href={links.find(link => link.name === 'LinkedIn')?.link} target="_blank" rel="noopener noreferrer" className="mx-2">
                                    <i className="fa-brands fa-linkedin fs-4" style={{color: 'var(--foreground-muted)'}}></i>
                                </a>
                            </>
                        )}
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
