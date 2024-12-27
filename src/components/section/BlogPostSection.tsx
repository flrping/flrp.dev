import { useParams } from 'next/navigation';
import { getPost } from '@/app/api/posts/route';
import { useState, useEffect } from 'react';
import { Post } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Container } from 'react-bootstrap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';

const BlogPostSection = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedPost = await getPost(slug as string);
                if (!fetchedPost) {
                    throw new Error('Post not found');
                }
                setPost(fetchedPost);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load post');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchPost();
    }, [slug]);

    if (isLoading) {
        return <div className='blog-post-loading'>Loading...</div>;
    }

    if (error) {
        return <div className='blog-post-error'>{error}</div>;
    }

    if (!post) {
        return null;
    }

    return (
        <div>
            <Container style={{ paddingTop: '5rem', paddingBottom: '5rem', minHeight: '100vh' }}>
                <article className='blog-post'>
                    <header className='blog-post-header'>
                        <h1 className='blog-post-title'>{post.title}</h1>
                        <div className='blog-post-meta'>
                            <time className='blog-post-date' dateTime={post.date.toISOString()}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })} 
                                {' at '}
                                {new Date(post.date).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
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
                    <hr className='blog-post-divider' />
                    <div className='blog-post-body'>
                        <ReactMarkdown  
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
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
            </Container>
        </div>
    );
};

export default BlogPostSection;
