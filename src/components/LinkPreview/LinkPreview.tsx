import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import './linkPreview.scss';
// @ts-ignore
import twThumb from '../../assets/tw-thumb.png';
// @ts-ignore
import redditThumb from '../../assets/reddit-thumb.png';

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
}) => {
  const _isMounted = useRef(true);
  const [metadata, setMetadata] = useState<APIResponse | null>();

  useEffect(() => {
    axios
      .get(proxyLink + url)
      .then((res) => {
        console.log(res);
        if (_isMounted.current) {
          setMetadata((res.data.metadata as unknown) as APIResponse);
        }
      })
      .catch((err: Error) => {
        console.error(err);
        console.error('No metadata could be found for the given URL.');
        if (_isMounted.current) {
          setMetadata(null);
        }
      });

    return () => {
      _isMounted.current = false;
    };
  }, [url]);

  if (!metadata) {
    return null;
  }

  const { image, description, title, siteName, hostname } = metadata;

  const onClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className={`Container ${className}`}
      style={{ width, height, borderRadius, textAlign, margin }}
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
        <h3 className='Title'>{title}</h3>
        {description && (
          <span className='Description Secondary'>
            {descriptionLength
              ? description.length > descriptionLength
                ? description.slice(0, descriptionLength) + '...'
                : description
              : description}
          </span>
        )}
        <div className='Secondary SiteDetails'>
          {siteName && <span>{siteName} • </span>}
          <span>{hostname}</span>
        </div>
      </div>
    </div>
  );
};
