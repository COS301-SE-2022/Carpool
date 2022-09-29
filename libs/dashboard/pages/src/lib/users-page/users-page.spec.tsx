import { render } from '@testing-library/react';

import UsersPage from './users-page';

describe('UsersPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersPage />);
    expect(baseElement).toBeTruthy();
  });
});
