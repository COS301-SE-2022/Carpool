import { render } from '@testing-library/react';

import ResetPasswordPage from './reset-password-page';

describe('ResetPasswordPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResetPasswordPage />);
    expect(baseElement).toBeTruthy();
  });
});
