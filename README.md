# React Link Preview

A React component that renders beautiful, fully-customizable link previews.

<img src='https://img.shields.io/npm/dt/@dhaiwat10/react-link-preview' />

<a href="https://codesandbox.io/s/rlp-demo-90e1x?file=/src/App.js" target="_blank">**Demo**</a>

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

This package uses a Heroku proxy to get around CORS issues. Feel free to go through the source code of the proxy <a href="https://github.com/dhaiwat10/rlp-proxy">here</a>.

I highly recommend forking both this repo and the proxy repo, and deploying your own copy of the project if you plan to use this package in a production app.

## API (Available props)

You can pass the following props to the `LinkPreview` component.

### `url` (string)

The URL for which you want to generate the link preview.

<hr />

### `fallback` (JSX.Element / any valid JSX)

A fallback component which will be rendered if a link preview could not be generated.

<hr />

### `showLoader` (boolean)

Whether you want to display the default loading skeleton or not.

<hr />

### `customLoader` (JSX.Element / any valid JSX)

Custom loader that will be displayed in place of the default loader.

<hr />

### `backgroundColor` (string)

Background color of the card.

<hr />

### `primaryTextColor` (string)

Color of the primary text (title).

<hr />

### `secondaryTextColor` (string)

Color of the secondary text (description, URL, domain name).

<hr />

### `borderColor` (string)

Color of the border of the card.

<hr />

### `className` (string)

Any custom CSS class that you want to apply to the card.

<hr />

### `width` (string or number)

Width of the card.

<hr />

### `height` (string or number)

Height of the card.

<hr />

### `margin` (string or number)

Margin around the card.

<hr />

### `descriptionLength` (number)

Length of the description in the card. (number of characters)

<hr />

### `borderRadius` (string or number)

Border radius of the card.
<hr />

### `imageHeight` (string or number)

Height of the image.

<hr />

### `textAlign` ( _left_, _right_ or _center_)

Alignment of the text.

<hr />

Props marked with **?** are **optional**.
