const SkeletonLinkCard = () => {
    return (
        <div className='p-5 border border-(--border) bg-(--surface) w-full'>
            <div className='skeleton skeleton-title' />
            <div className='skeleton skeleton-type' />
            <div className='skeleton skeleton-link' />
        </div>
    );
};

export default SkeletonLinkCard;
