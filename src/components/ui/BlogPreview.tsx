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
            <div className='p-5 border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 dark:bg-neutral-800 bg-white h-full'>
                <h2 className='text-xl text-(--accent)'>{post.title}</h2>
                <div className='mt-3 flex-1 text-sm text-black dark:text-white opacity-80'>
                    {previewRemark(previewContent)}
                </div>
                <div className='mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-2'>
                    {post.tags && (
                        <div className='flex flex-wrap gap-1'>
                            {post.tags.map((tag, index) => (
                                <span key={tag + index} className='bg-(--accent) px-2 py-1 text-[10px] text-white'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {post.date && (
                        <div className='ml-auto text-xs text-neutral-400'>
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
