import { render } from '@testing-library/react';

import PassengerActiveTripMapview from './passenger-active-trip-mapview';

describe('PassengerActiveTripMapview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PassengerActiveTripMapview />);
    expect(baseElement).toBeTruthy();
  });
});
