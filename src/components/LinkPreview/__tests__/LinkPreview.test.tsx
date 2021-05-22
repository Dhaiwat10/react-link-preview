import React from 'react';
import { LinkPreview, LinkPreviewProps } from '..';
import { render, screen } from '@testing-library/react';

const defaultProps: LinkPreviewProps = {
  url: 'https://barcauniversal.com',
};

const setup = (props = defaultProps) => render(<LinkPreview {...props} />);

describe('LinkPreview', () => {
  xit('renders', () => {
    setup();
    expect(screen.getByText('Barca'));
  });
});
