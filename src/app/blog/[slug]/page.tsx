'use client';

import SiteNavbar from '@/components/navbar/SiteNavbar';
import SiteFooter from '@/components/footer/SiteFooter';
import BlogPostSection from '@/components/section/BlogPostSection';
export default function Home() {
    return (
        <div>
            <SiteNavbar />
            <BlogPostSection />
            <SiteFooter />
        </div>
    );
}
