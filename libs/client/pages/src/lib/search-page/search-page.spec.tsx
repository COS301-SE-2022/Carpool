import { render } from '@testing-library/react';

import SearchPage from './search-page';

describe('SearchPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchPage />);
    expect(baseElement).toBeTruthy();
  });
});
