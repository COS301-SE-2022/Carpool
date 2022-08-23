import { render } from '@testing-library/react';

import RegisterDriver from './register-driver';

describe('RegisterDriver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegisterDriver />);
    expect(baseElement).toBeTruthy();
  });
});
