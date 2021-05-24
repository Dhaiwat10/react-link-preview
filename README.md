# React Link Preview

A React component that renders beautiful link previews.

**Note**: This package is stil in its early days. Functionality might not be as expected.

## How to use

Install the package:
`yarn add @dhaiwat10/react-link-preview`

`npm install @dhaiwat10/react-link-preview`

Import and render the preview:

```js
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const Home = () => {
  return <LinkPreview url='https://www.youtube.com/watch?v=4pNryX84oWs' />;
};
```

## API (Available props)

You can pass the following props to the `LinkPreview` component.

`url`: string

`className?`: string

`width?`: string or number

`height?`: string or number

`descriptionLength?`: number

`borderRadius?`: string or number

`imageHeight?`: string or number

`textAlign?`: _left_, _right_ or _center_

Props marked with **?** are **optional**.
