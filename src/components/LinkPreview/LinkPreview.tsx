import React, { useEffect, useState } from 'react';
import Meta from 'html-metadata-parser';

import './linkPreview.scss';
import classNames from 'classnames';

export interface LinkPreviewProps {
  url: string;
  className?: string;
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

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url, className = '' }) => {
  const classes = classNames('Container', className);

  const [metadata, setMetadata] = useState<MetaResult>();

  useEffect(() => {
    Meta.parser(`https://thingproxy.freeboard.io/fetch/${url}`, function (err, result) {
      console.log(result);
      setMetadata(result as MetaResult);
    });
  }, []);

  if (!metadata) {
    return null;
  }

  const { images, og } = metadata;

  const onClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div onClick={onClick} className={classes}>
      <p>Site name - {og.site_name}</p>
      {images && <img className='Image' src={og.image} />}
      <h3>Title - {og.title}</h3>
      <p>Description - {og.description}</p>
    </div>
  );
};
