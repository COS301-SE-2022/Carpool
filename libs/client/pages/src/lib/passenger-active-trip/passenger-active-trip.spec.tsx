import { render } from '@testing-library/react';

import PassengerActiveTrip from './passenger-active-trip';

describe('PassengerActiveTrip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PassengerActiveTrip />);
    expect(baseElement).toBeTruthy();
  });
});
