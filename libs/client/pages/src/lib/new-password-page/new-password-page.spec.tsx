import { render } from '@testing-library/react';

import NewPasswordPage from './new-password-page';

describe('NewPasswordPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewPasswordPage />);
    expect(baseElement).toBeTruthy();
  });
});
