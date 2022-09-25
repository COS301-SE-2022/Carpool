import { render } from '@testing-library/react';

import TripDetailsDrawer from './trip-details-drawer';

describe('TripDetailsDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
