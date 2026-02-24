import Link from 'next/link';

const SocialIcon = ({ icon, link }: { icon: string; link: string }) => (
    <Link href={link} target='_blank' rel='noopener noreferrer' className='mx-2'>
        <i className={`fa-brands fa-${icon} text-xl`} style={{ color: 'var(--foreground-muted)' }} />
    </Link>
);

export default SocialIcon;
