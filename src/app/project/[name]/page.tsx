'use client';

import SiteNavbar from '@/components/navbar/SiteNavbar';
import SiteFooter from '@/components/footer/SiteFooter';
import ProjectDetailsSection from '@/components/section/ProjectDetailsSection';

export default function ProjectPage() {
    return (
        <div>
            <SiteNavbar />
            <ProjectDetailsSection />
            <SiteFooter />
        </div>
    );
}
