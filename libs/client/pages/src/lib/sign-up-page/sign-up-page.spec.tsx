import { render } from '@testing-library/react';

import SignUpPage from './sign-up-page';

describe('SignUpPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpPage />);
    expect(baseElement).toBeTruthy();
  });
});
