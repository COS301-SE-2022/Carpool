import { render } from '@testing-library/react';

import SearchResults from './search-results';

describe('SearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResults />);
    expect(baseElement).toBeTruthy();
  });
});
