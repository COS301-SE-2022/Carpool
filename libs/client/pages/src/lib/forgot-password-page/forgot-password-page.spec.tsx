import { render } from '@testing-library/react';

import ForgotPasswordPage from './forgot-password-page';

describe('ForgotPasswordPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ForgotPasswordPage />);
    expect(baseElement).toBeTruthy();
  });
});
