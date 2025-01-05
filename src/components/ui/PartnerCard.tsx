import type { Partner } from '@/types/partner';
    
interface PartnerCardProps {
    partner: Partner;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
    return (
        <div className='partner-card'>
            <div className='partner-card-content'>
                <h5 className='partner-card-title'>{partner.name}</h5>
                <h6 className='partner-card-type'>{partner.type}</h6>
                <a className='partner-card-link' href={partner.link} target='_blank'>
                    {partner.text}
                </a>
            </div>
        </div>
    );
};

export default PartnerCard;
