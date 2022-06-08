import { render } from '@testing-library/react';

import DriverProfile from './driver-profile';

describe('DriverProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DriverProfile />);
    expect(baseElement).toBeTruthy();
  });
});
