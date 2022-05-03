import { render } from '@testing-library/react';

import ClientComponents from './client-components';

describe('ClientComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientComponents />);
    expect(baseElement).toBeTruthy();
  });
});
