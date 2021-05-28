import React from 'react';
import LoadingSkeleton from 'react-loading-skeleton';

import './skeleton.scss';

interface SkeletonProps {
  width?: string | number;
  imageHeight?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', imageHeight = '30vh' }) => {
  return (
    <div className='skeleton-container' style={{ width }}>
      <LoadingSkeleton width={width} height={imageHeight} />
      <div className='skeleton-lower-container'>
        <LoadingSkeleton count={3} />
      </div>
    </div>
  );
};

export default Skeleton;
