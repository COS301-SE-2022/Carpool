import { render } from '@testing-library/react';

import ClientPages from './client-pages';

describe('ClientPages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientPages />);
    expect(baseElement).toBeTruthy();
  });
});
