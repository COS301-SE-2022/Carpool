import React from 'react';
import { render } from '@testing-library/react-native';

import PostTrips from './post-trips';

describe('PostTrips', () => {
  it('should render successfully', () => {
    const { container } = render(<PostTrips />);
    expect(container).toBeTruthy();
  });
});
