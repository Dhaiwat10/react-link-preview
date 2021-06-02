import React from 'react';
import { LinkPreview } from '..';
import { render, screen } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { APIResponse } from '../LinkPreview';

const url = 'https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/';

const metadata: APIResponse = {
  title: 'Predicted Barcelona lineup against Eibar | Barca Universal',
  description:
    'For one final time this season, possibly for one last time under Ronald Koeman, Barcelona will take the field on Saturday. The season took a nosedive that few foresaw but left none surprised. Though Barcelona plays the relegated Eibar at the Ipurua, all eyes will be on the title decisive clashes of the two Madrid […]',
  image: 'https://barcauniversal.com/wp-content/uploads/2021/05/1002622558-scaled.jpg',
  siteName: 'Barca Universal',
  hostname: 'barcauniversal.com',
};

fetchMock.get(`https://rlp-proxy.herokuapp.com/v2?url=${url}`, {
  metadata,
});

describe('LinkPreview Component', () => {
  it('Component renders correctly', async () => {
    render(
      <LinkPreview url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/' />
    );

    const title = await screen.findByText(metadata.title as string);
    const description = await screen.findByText(metadata.description as string);
    const siteName = await screen.findByText(`${metadata.siteName} •`);
    const hostname = await screen.findByText(metadata.hostname as string);
    const containerDiv = await screen.findByTestId('image-container');
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(siteName).toBeTruthy();
    expect(hostname).toBeTruthy();
    expect(containerDiv.style.backgroundImage).toBe(`url(${metadata.image})`);
  });
});
