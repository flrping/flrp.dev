const SkeletonProjectCard = () => {
    return (
        <div className='p-6 border border-(--border) bg-(--surface) w-full'>
            <div className='skeleton skeleton-title' />
            <div className='skeleton skeleton-tag' />
            <div className='skeleton skeleton-stack' />
        </div>
    );
};

export default SkeletonProjectCard;
