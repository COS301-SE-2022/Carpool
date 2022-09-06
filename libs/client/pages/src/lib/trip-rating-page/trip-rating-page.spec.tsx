import { render } from '@testing-library/react';

import TripRatingPage from './trip-rating-page';

describe('TripRatingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripRatingPage />);
    expect(baseElement).toBeTruthy();
  });
});
