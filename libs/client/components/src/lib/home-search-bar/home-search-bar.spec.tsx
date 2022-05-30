import { render } from '@testing-library/react';

import HomeSearchBar from './home-search-bar';

describe('HomeSearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeSearchBar />);
    expect(baseElement).toBeTruthy();
  });
});
