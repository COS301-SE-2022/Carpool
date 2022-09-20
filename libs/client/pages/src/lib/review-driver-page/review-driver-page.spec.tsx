import { render } from '@testing-library/react';

import ReviewPage from './review-page';

describe('ReviewPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReviewPage />);
    expect(baseElement).toBeTruthy();
  });
});
