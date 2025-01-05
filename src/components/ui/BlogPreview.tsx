import type { Post } from '@/types/blog';
import Link from 'next/link';
import { formatDateTime } from '@/lib/time';
import previewRemark from '@/lib/remark/previewRemark';

interface BlogPreviewProps {
    post: Post;
}

const BlogPreview = ({ post }: BlogPreviewProps) => {
    const previewContent = post.content.substring(0, 500).split('.').slice(0, -1).join('.') + '...';

    const formattedDate = formatDateTime(post.date);

    return (
        <div className='blog-preview d-flex flex-column'>
            <Link href={`/blog/${post.slug}`} className='no-underline flex-grow-1 d-flex flex-column'>
                <h2 className='blog-preview-title'>{post.title}</h2>
                <div className='blog-preview-content flex-grow-1'>{previewRemark(previewContent)}</div>
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
