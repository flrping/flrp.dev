import SiteNavbar from '@/components/navbar/SiteNavbar';
import SiteFooter from '@/components/footer/SiteFooter';
import BlogPostSection from '@/components/section/BlogPostSection';
import { Metadata } from 'next';
import { postsCache } from '@/lib/cache/impl/post';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const cacheData = await postsCache.get('posts');

    if (!cacheData) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const post = await cacheData.postsById.get(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: post.title,
        description: post.content.slice(0, 150) + '...',
        openGraph: {
            title: post.title,
            description: post.content.slice(0, 150) + '...',
            url: `/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
        },
    };
}

export default function BlogPostPage() {
    return (
        <div>
            <SiteNavbar />
            <BlogPostSection />
            <SiteFooter />
        </div>
    );
}
