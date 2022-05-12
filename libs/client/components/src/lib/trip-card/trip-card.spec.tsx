import { render } from '@testing-library/react';

import TripCard from './trip-card';

describe('TripCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripCard />);
    expect(baseElement).toBeTruthy();
  });
});
