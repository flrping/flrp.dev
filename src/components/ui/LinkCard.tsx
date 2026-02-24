import type { Link } from '@/types/link';

interface LinkCardProps {
    link: Link;
}

const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <div className='p-5 border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 dark:bg-neutral-800 bg-white'>
            <h5 className='text-sm uppercase text-(--accent)'>{link.name}</h5>
            <p className='text-xs text-neutral-400 mt-1'>{link.type}</p>
            <a
                className='text-sm text-black dark:text-white mt-2 block hover:opacity-80'
                href={link.link}
                target='_blank'
            >
                {link.text}
            </a>
        </div>
    );
};

export default LinkCard;
