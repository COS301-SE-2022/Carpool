import { render } from '@testing-library/react';

import TripDetailsTopBar from './trip-details-top-bar';

describe('TripDetailsTopBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsTopBar />);
    expect(baseElement).toBeTruthy();
  });
});
