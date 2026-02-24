const SkeletonProjectCard = () => {
    return (
        <div className='p-6 border border-neutral-200 dark:border-neutral-700 w-full'>
            <div className='skeleton skeleton-title' />
            <div className='skeleton skeleton-tag' />
            <div className='skeleton skeleton-stack' />
        </div>
    );
};

export default SkeletonProjectCard;
