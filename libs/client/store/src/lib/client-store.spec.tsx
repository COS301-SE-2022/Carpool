import { render } from '@testing-library/react';

import ClientStore from './client-store';

describe('ClientStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientStore />);
    expect(baseElement).toBeTruthy();
  });
});
