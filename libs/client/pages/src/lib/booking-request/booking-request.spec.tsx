import { render } from '@testing-library/react';

import BookingRequest from './booking-request';

describe('BookingRequest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookingRequest />);
    expect(baseElement).toBeTruthy();
  });
});
