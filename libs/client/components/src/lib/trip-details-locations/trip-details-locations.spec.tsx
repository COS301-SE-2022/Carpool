import { render } from '@testing-library/react';

import TripDetailsLocations from './trip-details-locations';

describe('TripDetailsLocations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsLocations />);
    expect(baseElement).toBeTruthy();
  });
});
