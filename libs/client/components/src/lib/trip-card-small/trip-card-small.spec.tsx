import { render } from '@testing-library/react';

import TripCardSmall from './trip-card-small';

describe('TripCardSmall', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripCardSmall />);
    expect(baseElement).toBeTruthy();
  });
});
