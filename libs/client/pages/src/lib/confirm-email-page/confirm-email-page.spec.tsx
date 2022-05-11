import { render } from '@testing-library/react';

import ConfirmEmailPage from './confirm-email-page';

describe('ConfirmEmailPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmEmailPage />);
    expect(baseElement).toBeTruthy();
  });
});
