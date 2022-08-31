import { render } from '@testing-library/react';

import PayfastPage from './payfast-page';

describe('PayfastPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PayfastPage />);
    expect(baseElement).toBeTruthy();
  });
});
