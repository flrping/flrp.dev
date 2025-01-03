'use client';

import SiteNavbar from '@/components/navbar/SiteNavbar';
import SiteFooter from '@/components/footer/SiteFooter';
import BlogSection from '@/components/section/BlogSection';

export default function BlogPage() {
    return (
        <div>
            <SiteNavbar />
            <BlogSection />
            <SiteFooter />
        </div>
    );
}
