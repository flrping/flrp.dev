import type { Post } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface BlogPreviewProps {
    post: Post;
}

const BlogPreview = ({ post }: BlogPreviewProps) => {
    const previewContent = post.content.substring(0, 500).split('.').slice(0, -1).join('.') + '...';

    return (
        <div className='blog-preview'>
            <Link href={`/blog/${post.slug}`} className='no-underline'>
                <h2 className='blog-preview-title'>{post.title}</h2>
                <div className='blog-preview-content'>
                    <ReactMarkdown
                        allowedElements={['p', 'strong', 'em']}
                        components={{
                            h1: 'p',
                            h2: 'p',
                            h3: 'p',
                            img: () => null,
                            p: ({ children }) => <p className='line-clamp-3'>{children}</p>,
                        }}
                    >
                        {previewContent}
                    </ReactMarkdown>
                </div>
                <div className='blog-preview-footer'>
                    {post.tags && (
                        <div className='blog-preview-tags'>
                            {post.tags.map((tag, index) => (
                                <span key={tag + index} className='blog-preview-tag'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {post.date && (
                        <div className='blog-preview-date ms-auto'>
                            Posted on{' '}
                            <time dateTime={new Date(post.date).toISOString()}>
                                {new Date(post.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            {' at '}
                            <time dateTime={new Date(post.date).toISOString()}>
                                {new Date(post.date).toLocaleTimeString(undefined, {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </time>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default BlogPreview;
