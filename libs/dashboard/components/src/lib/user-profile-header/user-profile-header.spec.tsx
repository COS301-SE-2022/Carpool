import { render } from '@testing-library/react';

import UserProfileHeader from './user-profile-header';

describe('UserProfileHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfileHeader />);
    expect(baseElement).toBeTruthy();
  });
});
