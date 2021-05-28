import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import './linkPreview.scss';
// @ts-ignore
import twThumb from '../../assets/tw-thumb.png';
// @ts-ignore
import redditThumb from '../../assets/reddit-thumb.png';
import Skeleton from './Skeleton';

const proxyLink = 'https://rlp-proxy.herokuapp.com/v2?url=';

export interface LinkPreviewProps {
  url: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  descriptionLength?: number;
  borderRadius?: string | number;
  imageHeight?: string | number;
  textAlign?: 'left' | 'right' | 'center';
  margin?: string | number;
  fallback?: JSX.Element[] | JSX.Element | null;
  backgroundColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  borderColor?: string;
}

export interface APIResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  className = '',
  width,
  height,
  descriptionLength,
  borderRadius,
  imageHeight,
  textAlign,
  margin,
  fallback = null,
  backgroundColor = 'white',
  primaryTextColor = 'black',
  secondaryTextColor = 'rgb(100, 100, 100)',
  borderColor = '#ccc',
}) => {
  const _isMounted = useRef(true);
  const [metadata, setMetadata] = useState<APIResponse | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(proxyLink + url)
      .then((res) => {
        console.log(res);
        if (_isMounted.current) {
          setMetadata((res.data.metadata as unknown) as APIResponse);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        console.error(err);
        console.error('No metadata could be found for the given URL.');
        if (_isMounted.current) {
          setMetadata(null);
          setLoading(false);
        }
      });

    return () => {
      _isMounted.current = false;
    };
  }, [url]);

  if (loading) {
    return <Skeleton width={width} imageHeight={imageHeight} />;
  }

  if (!metadata) {
    return <>{fallback}</>;
  }

  const { image, description, title, siteName, hostname } = metadata;

  const onClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className={`Container ${className}`}
      style={{ width, height, borderRadius, textAlign, margin, backgroundColor, borderColor }}
    >
      {image && (
        <div
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            backgroundImage: `url(${image})`,
            height: imageHeight,
          }}
          className='Image'
        ></div>
      )}
      <div className='LowerContainer'>
        <h3 className='Title' style={{ color: primaryTextColor }}>
          {title}
        </h3>
        {description && (
          <span className='Description Secondary' style={{ color: secondaryTextColor }}>
            {descriptionLength
              ? description.length > descriptionLength
                ? description.slice(0, descriptionLength) + '...'
                : description
              : description}
          </span>
        )}
        <div className='Secondary SiteDetails' style={{ color: secondaryTextColor }}>
          {siteName && <span>{siteName} • </span>}
          <span>{hostname}</span>
        </div>
      </div>
    </div>
  );
};
