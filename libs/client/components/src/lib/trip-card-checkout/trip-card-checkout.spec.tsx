import { render } from '@testing-library/react';

import TripCardCheckout from './trip-card-checkout';

describe('TripCardCheckout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripCardCheckout />);
    expect(baseElement).toBeTruthy();
  });
});
