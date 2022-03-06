import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinkPreview } from './LinkPreview';

const customFetcher = async (url: string) => {
  const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`);
  const json = await response.json();
  return json.metadata;
};

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
  ))
  .add('Fallback', () => <LinkPreview url='https://webzy.dev' fallback={<div>Fallback</div>} />)
  .add('Colors', () => (
    <LinkPreview
      url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      backgroundColor='black'
      primaryTextColor='white'
      secondaryTextColor='#ccc'
      borderColor='red'
      width='30vw'
      margin='30px auto'
    />
  ))
  .add('Fallback image', () => (
    <LinkPreview
      url='https://google.com'
      width='30vw'
      fallbackImageSrc='https://www.aljazeera.com/wp-content/uploads/2021/08/2019-12-07T000000Z_879038429_RC2LQD9L67FQ_RTRMADP_3_SOCCER-SPAIN-FCB-RCD-REPORT.jpg?resize=770%2C513'
    />
  ))
  .add('Using custom fetcher', () => (
    <LinkPreview url='stripe.com' fetcher={customFetcher} fallback={<div>Fallback</div>} />
  ))
  .add('Image onError', () => (
    <LinkPreview url='https://www.brianfriel.xyz/learning-how-to-build-on-solana/' width='30vw' />
  ))
  .add('Explicit image', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      width='30vw'
      explicitImageSrc='https://barcauniversal.com/wp-content/uploads/2021/05/1002622558-2048x1365.jpg'
    />
  ))
  .add('Explicit no image in case of no image in metadata', () => (
    <LinkPreview url='https://barcauniversal.com' width='30vw' showPlaceholderIfNoImage={false} />
  ));
