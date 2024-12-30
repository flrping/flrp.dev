'use client';

import { fetchPost } from '@/lib/api/fetcher';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatDateTime } from '@/lib/time';
import useSWR from 'swr';
import { useMemo } from 'react';
import FadeContainer from '../ui/FadeContainer';

const BlogPostSection = () => {
    const { slug } = useParams();
    const { data: post, error, isLoading } = useSWR(`/api/posts/${slug}`, () => fetchPost(slug as string));

    const linkDate = useMemo(() => {
        if (!post) return null;
        return (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');

            return `${year}-${month}-${day}_${hour}-${minute}`;
        };
    }, [post]);


    if (isLoading) {
        return (
            <div
                className='d-flex justify-content-center align-items-center'
                style={{ minHeight: 'calc(100vh - 112px)' }}
            >
                <div className='spinner-border' role='status'></div>
            </div>
        );
    }

    const formattedDate = !post ? null : formatDateTime(new Date(post.date));

    return (
        <div>
            <FadeContainer isLoading={isLoading}>
                {error || !post || !linkDate ? (
                    <article className='blog-post mt-5'>
                        <h1 className='blog-post-title'>Post Not Found</h1>
                        <p>
                            We could not find the blog post you were looking for. It may have been removed or the URL is
                            incorrect.
                        </p>
                    </article>
                ) : (
                    <article className='blog-post mt-3'>
                        {post.banner && (
                            <div className='blog-post-banner'>
                                <picture>
                                    <source
                                        srcSet={`/api/posts/images?name=banner.webp&post=${linkDate(new Date(post.date))}`}
                                        type='image/webp'
                                    />
                                    <img
                                        className='blog-post-banner-image'
                                        src={`/api/posts/images?name=banner.webp&post=${linkDate(new Date(post.date))}`}
                                        alt='Banner'
                                    />
                                </picture>
                            </div>
                        )}
                        <header className='blog-post-header'>
                            <div className='d-flex flex-row align-items-center'>
                                <h1 className='blog-post-title'>{post.title}</h1>
                                <Link
                                    href={`https://github.com/flrping/flrp.dev/blob/main/src/assets/blog/${linkDate(new Date(post.date))}/content.md`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='mx-2 ms-auto'
                                    title='View post on GitHub'
                                >
                                    <i
                                        className='fa-brands fa-github fs-4'
                                        style={{ color: 'var(--foreground-muted)' }}
                                    ></i>
                                </Link>
                                <Link
                                    href={`https://twitter.com/intent/tweet?url=https://flrp.dev/blog/${post.slug}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='mx-2'
                                    title='Share'
                                >
                                    <i
                                        className='fa-solid fa-share-nodes fs-4'
                                        style={{ color: 'var(--foreground-muted)' }}
                                    ></i>
                                </Link>
                            </div>
                            <div className='blog-post-meta'>
                                <time className='blog-post-date' dateTime={formattedDate?.isoString}>
                                    {formattedDate?.date}
                                    {' at '}
                                    {formattedDate?.time}
                                </time>
                                {post.tags && (
                                    <div className='blog-post-tags'>
                                        {post.tags.map((tag) => (
                                            <span key={tag} className='blog-post-tag'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>
                        <hr className='blog-post-divider my-4' />
                        <div className='blog-post-body'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                    h1: () => null,
                                    img: ({ src, alt }) => (
                                        <picture>
                                            <source
                                                srcSet={`/api/posts/images?name=${src}&post=${linkDate(new Date(post.date))}`}
                                                type='image/webp'
                                            />
                                            <img
                                                src={`/api/posts/images?name=${src}&post=${linkDate(new Date(post.date))}`}
                                                alt={alt}
                                            />
                                        </picture>
                                    ),
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={theme}
                                                language={match[1]}
                                                PreTag='div'
                                                className='blog-post-code-block'
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={`blog-post-inline-code ${className || ''}`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>
                )}
            </FadeContainer>
        </div>
    );
};

export default BlogPostSection;
