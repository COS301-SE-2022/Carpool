import { render } from '@testing-library/react';

import TripDetailsBottomContainer from './trip-details-bottom-container';

describe('TripDetailsBottomContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetailsBottomContainer />);
    expect(baseElement).toBeTruthy();
  });
});
