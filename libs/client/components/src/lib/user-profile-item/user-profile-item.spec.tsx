import { render } from '@testing-library/react';

import UserProfileItem from './user-profile-item';

describe('UserProfileItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfileItem />);
    expect(baseElement).toBeTruthy();
  });
});
