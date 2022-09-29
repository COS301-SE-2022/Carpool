import { render } from '@testing-library/react';

import UserProfileContent from './user-profile-content';

describe('UserProfileContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfileContent />);
    expect(baseElement).toBeTruthy();
  });
});
