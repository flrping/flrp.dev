import { Link } from '@/types/link';
import LinkCard from '../ui/LinkCard';
import SkeletonLinkCard from '../ui/SkeletonLinkCard';
import { fetchLinks } from '@/lib/api/fetcher';
import useSWR from 'swr';

const LinksSection = () => {
    const { data, error, isLoading } = useSWR('/api/links', fetchLinks);

    if (error) {
        return <div>Error fetching links</div>;
    }

    return (
        <div className='py-10'>
            <div id='links' className='max-w-7xl mx-auto px-4 min-h-[20vh]'>
                <h1 className='text-center mb-5 text-(--accent) text-xl uppercase'>LINKS</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 justify-items-center'>
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <div key={index} className='w-full'>
                                  <SkeletonLinkCard />
                              </div>
                          ))
                        : data?.map((link: Link) => (
                              <div key={link.name} className='w-full'>
                                  <LinkCard link={link} />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default LinksSection;
