import { render } from '@testing-library/react';

import ForgotPasswordCodePage from './forgot-password-code-page';

describe('ForgotPasswordCodePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ForgotPasswordCodePage />);
    expect(baseElement).toBeTruthy();
  });
});
