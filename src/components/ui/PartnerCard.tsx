import type { Partner } from '@/types/partner';

interface PartnerCardProps {
    partner: Partner;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
    return (
        <div className='p-5 border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 dark:bg-neutral-800 bg-white'>
            <h5 className='text-sm uppercase text-(--accent)'>{partner.name}</h5>
            <p className='text-xs text-neutral-400 mt-1'>{partner.type}</p>
            <a className='text-sm text-black dark:text-white mt-2 block' href={partner.link} target='_blank'>
                {partner.text}
            </a>
        </div>
    );
};

export default PartnerCard;
