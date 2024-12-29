import SiteNavbar from '@/components/navbar/SiteNavbar';
import SiteFooter from '@/components/footer/SiteFooter';
import BlogPostSection from '@/components/section/BlogPostSection';
import { Metadata } from 'next';
import { getPost } from '@/app/api/posts/route';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug);

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
            url: `/blog/${params.slug}`,
            type: 'article',
            publishedTime: post.date.toISOString(),
            tags: post.tags,
        },
    };
}


export default function Home() {
    return (
        <div>
            <SiteNavbar />
            <BlogPostSection />
            <SiteFooter />
        </div>
    );
}
