import type { Link } from '@/types/link';

interface LinkCardProps {
    link: Link;
}

const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <div className='link-card'>
            <div className='link-card-content'>
                <h5 className='link-card-title'>{link.name}</h5>
                <h6 className='link-card-type'>{link.type}</h6>
                <a className='link-card-link' href={link.link} target='_blank'>
                    {link.text}
                </a>
            </div>
        </div>
    );
};

export default LinkCard;