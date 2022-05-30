import { render } from '@testing-library/react';

import TripDetailsMapView from './trip-details-map-view';

describe('TripDetailsMapView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsMapView />);
    expect(baseElement).toBeTruthy();
  });
});
