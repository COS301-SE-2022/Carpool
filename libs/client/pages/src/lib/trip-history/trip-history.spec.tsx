import { render } from '@testing-library/react';

import TripHistory from './trip-history';

describe('TripHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripHistory />);
    expect(baseElement).toBeTruthy();
  });
});
