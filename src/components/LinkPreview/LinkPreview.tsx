import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import './linkPreview.scss';

// const proxyLink = 'https://thingproxy.freeboard.io/fetch/';
const proxyLink = 'https://rlp-proxy.herokuapp.com/?url=';

export interface LinkPreviewProps {
  url: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  descriptionLength?: number;
  borderRadius?: string | number;
  imageHeight?: string | number;
  textAlign?: 'left' | 'right' | 'center';
}

interface Image {
  url: string;
}

export interface MetaResult {
  images: Array<Image>;
  meta: {
    description?: string;
    title?: string;
  };
  og: {
    image?: string;
    description?: string;
    title?: string;
    images?: Array<Image>;
    site_name?: string;
    type?: string;
    url?: string;
    videos?: Array<Image>;
  };
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
}) => {
  const _isMounted = useRef(true);
  const [metadata, setMetadata] = useState<MetaResult | null>();

  useEffect(() => {
    axios
      .get(proxyLink + url)
      .then((res) => {
        console.log(res);
        if (_isMounted.current) {
          setMetadata((res.data.metadata as unknown) as MetaResult);
        }
      })
      .catch((err: Error) => {
        console.log(err);
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

  const { images, og, meta } = metadata;

  const image = og.image ? og.image : images.length > 0 ? images[0].url : null;

  const description = og.description ? og.description : meta.description ? meta.description : null;
  const { hostname } = new URL(url);

  const onClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className={`Container ${className}`}
      style={{ width, height, borderRadius, textAlign }}
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
        <h3 className='Title'>{og.title ? og.title : meta.title}</h3>
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
          {og.site_name && <span>{og.site_name} • </span>}
          <span>{hostname}</span>
        </div>
      </div>
    </div>
  );
};
