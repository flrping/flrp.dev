import PartnerCard from '../ui/PartnerCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';
import useSWR from 'swr';
import { fetchPartners } from '@/lib/api/fetcher';
import { Partner } from '@/types/partner';

const PartnersSection = () => {
    const { data, error, isLoading } = useSWR('/api/partners', fetchPartners);

    if (error) {
        return <div>Error fetching partners</div>;
    }

    return (
        <div className='py-20'>
            <div id='partners' className='max-w-7xl mx-auto px-4 min-h-[20vh]'>
                <h1 className='text-center mb-5 text-(--accent) text-xl uppercase'>PARTNERS</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 justify-items-center'>
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className='w-full'>
                                  <SkeletonLinkCard />
                              </div>
                          ))
                        : data?.map((partner: Partner) => (
                              <div key={partner.name} className='w-full'>
                                  <PartnerCard partner={partner} />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;
