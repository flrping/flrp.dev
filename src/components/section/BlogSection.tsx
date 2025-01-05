import { useEffect, useState } from 'react';
import BlogPreview from '@/components/ui/BlogPreview';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <h1>Error fetching posts</h1>
                <p>Please try again later.</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <Container style={{ paddingTop: '10rem', paddingBottom: '5rem' }}>
                <h3 className='text-center mb-5'>BLOG</h3>
                <Row xs={1} sm={1} md={2} className='g-4'>
                    {posts.length === 0 && isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Col key={index}>
                                  <SkeletonBlogPreview />
                              </Col>
                          ))
                        : posts.map((post: Post, index: number) => (
                              <Col key={post.slug + index}>
                                  <BlogPreview post={post} />
                              </Col>
                          ))}
                </Row>
                <div className='d-flex justify-content-center mt-5'>
                    <Button
                        onClick={() => {
                            setPage(page + 1);
                            setMore(true);
                        }}
                    >
                        Load More
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default BlogSection;
