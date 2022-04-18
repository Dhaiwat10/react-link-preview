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

const customFetcher = async (url: string) => {
  const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`);
  const json = await response.json();
  return json.metadata;
};

fetchMock.get(`https://rlp-proxy.herokuapp.com/v2?url=${url}`, {
  metadata,
});

describe('LinkPreview Component', () => {
  it('renders the component correctly', async () => {
    const { container } = render(<LinkPreview url={url} />);
    expect(container).toMatchSnapshot();
    const title = await screen.findByText(metadata.title as string);
    const description = await screen.findByText(metadata.description as string);
    const siteName = await screen.findByText(`${metadata.siteName} •`);
    const hostname = await screen.findByText(metadata.hostname as string);
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(siteName).toBeTruthy();
    expect(hostname).toBeTruthy();
  });

  it('applies the className prop', async () => {
    const className = 'TestClass';

    render(<LinkPreview url={url} className={className} />);

    const containerDiv = await screen.findByTestId('container');
    expect(containerDiv.classList.contains(className)).toBeTruthy;
  });

  it('applies the various style props correctly', async () => {
    const width = '400px';
    const height = '400px';
    const borderRadius = '10px';
    const imageHeight = '100px';
    const textAlign = 'left';
    const margin = '10px';
    const backgroundColor = 'rgb(204, 204, 204)';
    const primaryTextColor = 'rgb(255, 255, 255)';
    const secondaryTextColor = 'rgb(240, 240, 240)';
    const borderColor = 'rgb(0, 0, 0)';

    render(
      <LinkPreview
        url={url}
        width={width}
        height={height}
        borderRadius={borderRadius}
        imageHeight={imageHeight}
        textAlign={textAlign}
        margin={margin}
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      />
    );

    const containerDiv = await screen.findByTestId('container');
    expect(containerDiv).toMatchSnapshot();
    expect(containerDiv.style.width).toBe(width);
    expect(containerDiv.style.height).toBe(height);
    expect(containerDiv.style.textAlign).toBe(textAlign);
    expect(containerDiv.style.margin).toBe(margin);
    expect(containerDiv.style.backgroundColor).toBe(backgroundColor);
    expect(containerDiv.style.borderColor).toBe(borderColor);

    const innerContainer = await screen.findByTestId('image-container');
    expect(innerContainer.style.borderTopLeftRadius).toBe(borderRadius);
    expect(innerContainer.style.borderTopRightRadius).toBe(borderRadius);
    expect(innerContainer.style.height).toBe(imageHeight);

    const title = await screen.findByTestId('title');
    expect(title.style.color).toBe(primaryTextColor);

    const desc = await screen.findByTestId('desc');
    expect(desc.style.color).toBe(secondaryTextColor);
  });

  it('renders fallback correctly', async () => {
    const url = 'https://google.com';
    const fallback = <div data-testid='fallback'>fallback</div>;

    fetchMock.getOnce(`https://rlp-proxy.herokuapp.com/v2?url=${url}`, {
      metadata: null,
    });

    const { container } = render(<LinkPreview url={url} fallback={fallback} />);
    expect(container).toMatchSnapshot();
    const fallbackDiv = await screen.findByTestId('fallback');
    expect(fallbackDiv).toBeTruthy();
  });

  it('works properly with a custom fetcher', async () => {
    render(<LinkPreview url={url} fetcher={customFetcher} />);

    const title = await screen.findByText(metadata.title as string);
    const description = await screen.findByText(metadata.description as string);
    const siteName = await screen.findByText(`${metadata.siteName} •`);
    const hostname = await screen.findByText(metadata.hostname as string);
    // const containerDiv = await screen.findByTestId('image-container');
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(siteName).toBeTruthy();
    expect(hostname).toBeTruthy();
    // expect(containerDiv.style.backgroundImage).toBe(
    //   `url(${metadata.image}), url(${placeholderImg})`
    // );
  });

  it('calls onSuccess after fetching metadata', async () => {
    const onSuccess = jest.fn((metadata) => console.log(metadata));

    render(<LinkPreview url={url} onSuccess={onSuccess} />);

    setTimeout(() => {
      expect(onSuccess).toBeCalledTimes(1);
    }, 1000);
  });
});
