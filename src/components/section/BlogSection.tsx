import { useEffect, useState } from 'react';
import BlogPreview from '@/components/ui/BlogPreview';
import SkeletonBlogPreview from '../ui/SkeletonBlogPreview';
import useSWR from 'swr';
import { fetchPosts } from '@/lib/api/fetcher';
import { Post } from '@/types/blog';

const BlogSection = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [more, setMore] = useState(true);
    const [page, setPage] = useState(1);

    const { data, error, isLoading } = useSWR(`/api/posts?page=${page}`, () => fetchPosts(page));

    useEffect(() => {
        if (data && more) {
            setPosts((prev) => [...prev, ...data.posts]);
            setMore(false);
        }
    }, [data, more]);

    if (error) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                    <h1>Error fetching posts</h1>
                    <p>Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 pt-[10rem] pb-[5rem]'>
                <h3 className='text-center mb-[3rem] uppercase'>BLOG</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {posts.length === 0 && isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <div key={index}>
                                  <SkeletonBlogPreview />
                              </div>
                          ))
                        : posts.map((post: Post, index: number) => (
                              <div key={post.slug + index}>
                                  <BlogPreview post={post} />
                              </div>
                          ))}
                </div>
                <div className='flex justify-center mt-[3rem]'>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            setPage(page + 1);
                            setMore(true);
                        }}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;
