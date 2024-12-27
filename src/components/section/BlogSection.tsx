import { useEffect } from 'react';
import { useState } from 'react';
import { Post } from '@/types/blog';
import BlogPreview from '@/components/ui/BlogPreview';
import { Col, Container, Row } from 'react-bootstrap';
import SkeletonBlogPreview from '../ui/SkeletonBlogPreview';

const BlogSection = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        fetch(`/api/posts?page=${page}`)
            .then((response) => response.json())
            .then((data: { posts: Post[]; total: number; page: number; totalPages: number }) => {
                setPosts((prevPosts) => [...prevPosts, ...data.posts]);
                setHasMore(data.page < data.totalPages);
                setPage(page + 1);
            })
            .finally(() => setIsLoading(false));
    }, [page, isLoading, hasMore]);

    return (
        <div>
            <Container style={{ paddingTop: '10rem', paddingBottom: '5rem', minHeight: '100vh' }}>
                <h3 className='text-center mb-5'>BLOG</h3>
                <Row xs={1} sm={1} md={2} className='g-4'>
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Col key={index}>
                                  <SkeletonBlogPreview />
                              </Col>
                          ))
                        : posts.map((post, index) => (
                              <Col key={post.slug + index}>
                                  <BlogPreview post={post} />
                              </Col>
                          ))}
                </Row>
            </Container>
        </div>
    );
};

export default BlogSection;
