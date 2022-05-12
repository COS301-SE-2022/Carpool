import { render } from '@testing-library/react';

import TripDetails from './trip-details';

describe('TripDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetails />);
    expect(baseElement).toBeTruthy();
  });
});
