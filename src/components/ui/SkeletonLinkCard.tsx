const SkeletonLinkCard = () => {
    return (
        <div className='p-5 border border-neutral-200 dark:border-neutral-700 w-full'>
            <div className='skeleton skeleton-title' />
            <div className='skeleton skeleton-type' />
            <div className='skeleton skeleton-link' />
        </div>
    );
};

export default SkeletonLinkCard;
