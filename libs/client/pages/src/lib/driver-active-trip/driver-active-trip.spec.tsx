import { render } from '@testing-library/react';

import DriverActiveTrip from './driver-active-trip';

describe('DriverActiveTrip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DriverActiveTrip />);
    expect(baseElement).toBeTruthy();
  });
});
