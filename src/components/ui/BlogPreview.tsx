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
        <Link href={`/blog/${post.slug}`} className='flex flex-col'>
            <div className='p-5 border border-(--border) bg-(--surface) hover:bg-(--surface-elevated) h-full transition-colors'>
                <h2 className='text-xl text-(--accent)'>{post.title}</h2>
                <div className='mt-3 flex-1 text-sm text-(--foreground) opacity-80'>
                    {previewRemark(previewContent)}
                </div>
                <div className='mt-4 pt-3 border-t border-(--border) flex items-center gap-2'>
                    {post.tags && (
                        <div className='flex flex-wrap gap-1'>
                            {post.tags.map((tag, index) => (
                                <span
                                    key={tag + index}
                                    className='bg-(--accent) px-2 py-1 text-[10px] text-(--on-accent)'
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {post.date && (
                        <div className='ml-auto text-xs text-(--foreground-muted)'>
                            <time dateTime={formattedDate.isoString}>{formattedDate.date}</time>
                            {' at '}
                            <time dateTime={formattedDate.isoString}>{formattedDate.time}</time>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default BlogPreview;
