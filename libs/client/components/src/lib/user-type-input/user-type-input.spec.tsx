import React from 'react';
import { render } from '@testing-library/react-native';

import UserTypeInput from './user-type-input';

describe('UserTypeInput', () => {
  it('should render successfully', () => {
    const { container } = render(<UserTypeInput />);
    expect(container).toBeTruthy();
  });
});
