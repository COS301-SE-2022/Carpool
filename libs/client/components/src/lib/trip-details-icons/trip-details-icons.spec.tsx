import { render } from '@testing-library/react';

import TripDetailsIcons from './trip-details-icons';

describe('TripDetailsIcons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsIcons />);
    expect(baseElement).toBeTruthy();
  });
});
