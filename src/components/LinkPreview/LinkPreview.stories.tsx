import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinkPreview } from './LinkPreview';

storiesOf('LinkPreview', module)
  .add('Default', () => <LinkPreview url='https://barcauniversal.com' />)
  .add('Article', () => (
    <LinkPreview url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/' />
  ))
  .add('Text align right', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      textAlign='right'
    />
  ))
  .add('Custom image height', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      imageHeight='50vh'
    />
  ))
  .add('YouTube link', () => (
    <LinkPreview url='https://www.youtube.com/watch?v=JKJdGNHW1xk' width='30vw' />
  ))
  .add('Twitter link', () => (
    <LinkPreview url='https://twitter.com/BarcaUniversal/status/1396232440314830856' width='20vw' />
  ))
  .add('Reddit link', () => (
    <LinkPreview
      url='https://www.reddit.com/r/LifeProTips/comments/nivqb3/lpt_if_your_your_largest_hex_key_is_to_small_you/'
      width='20vw'
      descriptionLength={100}
    />
  ));
