import { fetchProject } from '@/lib/api/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import FadeContainer from '../ui/FadeContainer';
import fullRemark from '@/lib/remark/fullRemark';
import Link from 'next/link';

const ProjectDetailsSection = () => {
    const { name } = useParams();
    const { data, error, isLoading } = useSWR(`/api/projects/${name}`, () => fetchProject(name as string));

    if (error) return <div>Error: {error.message}</div>;

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-112px)]'>
                <div className='spinner-border' role='status'></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
            <FadeContainer isLoading={isLoading}>
                <div className='mt-30'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='w-full md:w-1/4'>
                            <div className='bg-(--surface) border border-(--border) p-6'>
                                <h1 className='uppercase text-xl text-(--accent)'>{data?.name}</h1>
                                <h5 className='text-(--accent) mt-5'>Stack</h5>
                                <p className='text-sm mt-1 text-(--foreground)'>{data?.stack.join(', ')}</p>
                                <h5 className='text-(--accent) mt-5'>Tags</h5>
                                <p className='text-sm mt-1 text-(--foreground)'>{data?.tags.join(', ')}</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2 mt-2'>
                                {data?.links.map((link) => (
                                    <Link
                                        className='bg-(--accent) w-full border border-(--accent-darker) px-5 py-2 font-light text-(--on-accent)'
                                        key={link.name}
                                        href={link.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {link.name}
                                        <i className='fa-solid fa-arrow-up-right-from-square ml-2'></i>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className='w-full md:w-3/4 p-4 border border-(--border) bg-(--surface)'>
                            <div className='project-details-body'>
                                {fullRemark(data?.description || '', `/api/projects/images`, {
                                    project: name as string,
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </FadeContainer>
        </div>
    );
};

export default ProjectDetailsSection;
