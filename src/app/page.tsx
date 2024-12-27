'use client';

import SiteNavbar from '@/components/navbar/SiteNavbar';
import ProjectsSection from '@/components/section/ProjectsSection';
import LinksSection from '@/components/section/LinksSection';
import PartnersSection from '@/components/section/PartnersSection';
import SiteFooter from '@/components/footer/SiteFooter';

export default function Home() {
    return (
        <div>
            <SiteNavbar />
            <ProjectsSection />
            <LinksSection />
            <PartnersSection />
            <SiteFooter />
        </div>
    );
}
