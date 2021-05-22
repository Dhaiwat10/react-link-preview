import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinkPreview } from './LinkPreview';

storiesOf('LinkPreview', module)
  .add('Default', () => <LinkPreview url='https://google.com' />)
  .add('Article', () => (
    <LinkPreview url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/' />
  ));
