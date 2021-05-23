import React from 'react';
import { LinkPreview } from '..';
import { render } from '@testing-library/react';

describe('LinkPreview Component', () => {
  it('Component renders', async () => {
    render(<LinkPreview url='https://barcauniversal.com' />);
  });
});
