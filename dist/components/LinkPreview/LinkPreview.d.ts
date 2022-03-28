import React from 'react';
import './linkPreview.scss';
export declare const placeholderImg = "https://i.imgur.com/UeDNBNQ.jpeg";
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
    customTitle?: string;
    customDescription?: string;
    showPlaceholderIfNoImage?: boolean;
}
export interface APIResponse {
    title: string | null;
    description: string | null;
    image: string | null;
    siteName: string | null;
    hostname: string | null;
}
export declare const LinkPreview: React.FC<LinkPreviewProps>;
