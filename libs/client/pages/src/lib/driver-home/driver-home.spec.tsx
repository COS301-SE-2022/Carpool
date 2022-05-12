import React from 'react';
import { render } from '@testing-library/react-native';

import DriverHome from './driver-home';

describe('DriverHome', () => {
  it('should render successfully', () => {
    const { container } = render(<DriverHome />);
    expect(container).toBeTruthy();
  });
});
