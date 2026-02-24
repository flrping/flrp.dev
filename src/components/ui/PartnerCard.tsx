import type { Partner } from '@/types/partner';

interface PartnerCardProps {
    partner: Partner;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
    return (
        <div className='p-5 border border-(--border) bg-(--surface) hover:bg-(--surface-elevated) transition-colors'>
            <h5 className='text-sm uppercase text-(--accent)'>{partner.name}</h5>
            <p className='text-xs text-(--foreground-muted) mt-1'>{partner.type}</p>
            <a className='text-sm text-(--foreground) mt-2 block' href={partner.link} target='_blank'>
                {partner.text}
            </a>
        </div>
    );
};

export default PartnerCard;
