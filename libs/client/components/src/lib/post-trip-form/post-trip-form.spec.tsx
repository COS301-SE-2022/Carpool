import React from 'react';
import { render } from '@testing-library/react-native';

import PostTripForm from './post-trip-form';

describe('PostTripForm', () => {
  it('should render successfully', () => {
    const { container } = render(<PostTripForm />);
    expect(container).toBeTruthy();
  });
});
