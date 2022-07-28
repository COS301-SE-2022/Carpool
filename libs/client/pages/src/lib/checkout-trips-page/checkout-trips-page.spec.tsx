import { render } from '@testing-library/react';

import CheckoutTrips from './checkout-trips-page';

describe('CheckoutTrips', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckoutTrips />);
    expect(baseElement).toBeTruthy();
  });
});
