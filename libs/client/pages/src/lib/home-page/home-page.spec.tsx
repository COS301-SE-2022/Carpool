import { render } from '@testing-library/react';

import HomePage from './home-page';

describe('HomePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
