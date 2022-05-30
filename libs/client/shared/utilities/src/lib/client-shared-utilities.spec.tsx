import { render } from '@testing-library/react';

import ClientSharedUtilities from './client-shared-utilities';

describe('ClientSharedUtilities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientSharedUtilities />);
    expect(baseElement).toBeTruthy();
  });
});
