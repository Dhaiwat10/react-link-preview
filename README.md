# React Link Preview

A React component that renders beautiful, fully-customizable link previews. 

![Demo](demo.gif)
<a href="https://twitter.com/intent/follow?screen_name=dhaiwat10">
<img src="https://img.shields.io/twitter/follow/dhaiwat10.svg?label=Follow%20@dhaiwat10" alt="Follow @dhaiwat10" />
</a>
[![npm version](https://badge.fury.io/js/%40dhaiwat10%2Freact-link-preview.svg)](https://badge.fury.io/js/%40dhaiwat10%2Freact-link-preview)
![package downloads](https://img.shields.io/npm/dt/@dhaiwat10/react-link-preview)
![CI](https://img.shields.io/github/workflow/status/dhaiwat10/react-link-preview/CI)

<a href="https://codesandbox.io/s/rlp-demo-90e1x?file=/src/App.js" target="_blank">Demo</a>

## How to use

**Install the package:**

`yarn add @dhaiwat10/react-link-preview`

`npm install @dhaiwat10/react-link-preview`

**Import and render the preview:**

```js
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const Home = () => {
  return <LinkPreview url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width='400px' />;
};
```

If the component renders nothing, it means that no metadata could be scraped for the URL. Provide a `fallback` component if you don't want to render `null`.

## Important

This package uses a Heroku [proxy (open-source)](https://github.com/dhaiwat10/rlp-proxy) to get around CORS issues. The public proxy receives a lot of traffic (+ there is a rate limit) and is not recommended for production use.

## Recommended workflow (for production)

- Please [fork the proxy repo](https://github.com/dhaiwat10/rlp-proxy) and host your own copy of it.
- You can then use the `customFetcher` prop to pass a fetcher function that fetches data from _your_ proxy. The `LinkPreview` will now use your proxy as the data source. More details below.

## API (Available props)

You can pass the following props to the `LinkPreview` component.

### `url` (string)

The URL for which you want to generate the link preview.

<hr />

### `customFetcher?` (function)

A function that takes in a `url` & fetches data from a proxy/server. The function should return a Promise that resolves to an object with the following structure:

```js
{
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}
```

You can use any data-source as you like as long as the `customFetcher` function returns a Promise that resolves to an object with the above structure.

[Example](src/components/LinkPreview/LinkPreview.stories.tsx#L54)

<hr />

### `fallback?` (JSX.Element / any valid JSX)

A fallback component which will be rendered if a link preview could not be generated.

<hr />

### `fallbackImageSrc` (string)

A fallback image src/URL which will be used if there was no image found for the URL.

### `explicitImageSrc` (string)

The src that will be used for the image regardless of what the data source returns.

### `showLoader?` (boolean)

Whether you want to display the default loading skeleton or not.

<hr />

### `customLoader?` (JSX.Element / any valid JSX)

Custom loader that will be displayed in place of the default loader.

<hr />

### `backgroundColor?` (string)

Background color of the card.

<hr />

### `primaryTextColor?` (string)

Color of the primary text (title).

<hr />

### `secondaryTextColor?` (string)

Color of the secondary text (description, URL, domain name).

<hr />

### `borderColor?` (string)

Color of the border of the card.

<hr />

### `className?` (string)

Any custom CSS class that you want to apply to the card.

<hr />

### `width?` (string or number)

Width of the card.

<hr />

### `height?` (string or number)

Height of the card.

<hr />

### `margin?` (string or number)

Margin around the card.

<hr />

### `descriptionLength?` (number)

Length of the description in the card. (number of characters)

<hr />

### `borderRadius?` (string or number)

Border radius of the card.

<hr />

### `imageHeight?` (string or number)

Height of the image.

<hr />

### `textAlign?` ( _left_, _right_ or _center_)

Alignment of the text.

<hr />

### `openInNewTab?` (boolean)

Where the link is opened (new tab or current tab).

<hr />

### `showPlaceholderIfNoImage?` (boolean)

Whether the placeholder image is displayed in case no image could be scraped.

___

Props marked with **?** are **optional**.
