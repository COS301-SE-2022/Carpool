import { render } from '@testing-library/react';

import ChangePassword from './change-password';

describe('ChangePassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangePassword />);
    expect(baseElement).toBeTruthy();
  });
});
