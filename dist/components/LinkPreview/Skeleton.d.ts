import React from 'react';
import './skeleton.scss';
interface SkeletonProps {
    width?: string | number;
    imageHeight?: string | number;
    margin?: string | number;
}
declare const Skeleton: React.FC<SkeletonProps>;
export default Skeleton;
