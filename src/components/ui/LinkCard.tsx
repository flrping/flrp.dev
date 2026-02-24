import type { Link } from '@/types/link';

interface LinkCardProps {
    link: Link;
}

const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <div className='p-5 border border-(--border) bg-(--surface) hover:bg-(--surface-elevated) transition-colors'>
            <h5 className='text-sm uppercase text-(--accent)'>{link.name}</h5>
            <p className='text-xs text-(--foreground-muted) mt-1'>{link.type}</p>
            <a className='text-sm text-(--foreground) mt-2 block hover:opacity-80' href={link.link} target='_blank'>
                {link.text}
            </a>
        </div>
    );
};

export default LinkCard;
