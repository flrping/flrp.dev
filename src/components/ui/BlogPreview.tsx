import type { Post } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { formatDateTime } from '@/lib/time';

interface BlogPreviewProps {
    post: Post;
}

const BlogPreview = ({ post }: BlogPreviewProps) => {
    const previewContent = post.content.substring(0, 500).split('.').slice(0, -1).join('.') + '...';

    const formattedDate = formatDateTime(new Date(post.date));

    return (
        <div className='blog-preview d-flex flex-column'>
            <Link href={`/blog/${post.slug}`} className='no-underline flex-grow-1 d-flex flex-column'>
                <h2 className='blog-preview-title'>{post.title}</h2>
                <div className='blog-preview-content flex-grow-1'>
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
                            <time dateTime={formattedDate.isoString}>{formattedDate.date}</time>
                            {' at '}
                            <time dateTime={formattedDate.isoString}>{formattedDate.time}</time>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default BlogPreview;
