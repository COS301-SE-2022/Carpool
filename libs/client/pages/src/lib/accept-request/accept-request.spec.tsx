import { render } from '@testing-library/react';

import AcceptRequest from './accept-request';

describe('AcceptRequest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AcceptRequest />);
    expect(baseElement).toBeTruthy();
  });
});
