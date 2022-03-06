import React, { useEffect, useRef, useState } from 'react';

import './linkPreview.scss';
import Skeleton from './Skeleton';

const proxyLink = 'https://rlp-proxy.herokuapp.com/v2?url=';
export const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

function isValidResponse(res: APIResponse | null): boolean {
  if (!res) return false;

  return (
    res.title !== null &&
    res.description !== null &&
    res.image !== null &&
    res.siteName !== null &&
    res.hostname !== null &&
    res.title !== undefined &&
    res.description !== undefined &&
    res.image !== undefined &&
    res.siteName !== undefined &&
    res.hostname !== undefined &&
    res.image !== 'null' &&
    !res.image.startsWith('/')
  );
}

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
  showLoader?: boolean;
  customLoader?: JSX.Element[] | JSX.Element | null;
  openInNewTab?: boolean;
  fetcher?: (url: string) => Promise<APIResponse | null>;
  fallbackImageSrc?: string;
  explicitImageSrc?: string;
  /* Whether the placeholder image is displayed in case no image could be scraped */
  showPlaceholderIfNoImage?: boolean;
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
  showLoader = true,
  customLoader = null,
  openInNewTab = true,
  fetcher,
  fallbackImageSrc = placeholderImg,
  explicitImageSrc = null,
  showPlaceholderIfNoImage = true,
}) => {
  const _isMounted = useRef(true);
  const [metadata, setMetadata] = useState<APIResponse | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _isMounted.current = true;
    setLoading(true);

    if (fetcher) {
      fetcher(url)
        .then((res) => {
          if (_isMounted.current) {
            if (isValidResponse(res)) {
              setMetadata(res);
            } else {
              setMetadata(null);
            }
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
    } else {
      fetch(proxyLink + url)
        .then((res) => res.json())
        .then((res) => {
          if (_isMounted.current) {
            setMetadata((res.metadata as unknown) as APIResponse);
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
    }

    return () => {
      _isMounted.current = false;
    };
  }, [url, fetcher]);

  if (loading && showLoader) {
    if (customLoader) {
      return <>{customLoader}</>;
    } else {
      return <Skeleton width={width} imageHeight={imageHeight} margin={margin} />;
    }
  }

  if (!metadata) {
    return <>{fallback}</>;
  }

  const { image, description, title, siteName, hostname } = metadata;

  const onClick = () => {
    const browserTarget = openInNewTab ? '_blank' : '_self';
    window.open(url, browserTarget);
  };

  return (
    <div
      data-testid='container'
      onClick={onClick}
      className={`Container ${className}`}
      style={{ width, height, borderRadius, textAlign, margin, backgroundColor, borderColor }}
    >
      {(image || fallbackImageSrc) && showPlaceholderIfNoImage && (
        <div
          data-testid='image-container'
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            backgroundImage: `url(${
              explicitImageSrc || image || fallbackImageSrc
            }), url(${fallbackImageSrc})`,
            height: imageHeight,
          }}
          className='Image'
        ></div>
      )}

      <div className='LowerContainer'>
        <h3 data-testid='title' className='Title' style={{ color: primaryTextColor }}>
          {title}
        </h3>
        {description && (
          <span
            data-testid='desc'
            className='Description Secondary'
            style={{ color: secondaryTextColor }}
          >
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
