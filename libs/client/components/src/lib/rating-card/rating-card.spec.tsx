import { render } from '@testing-library/react';

import RatingCard from './Rating-card';

describe('RatingCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RatingCard />);
    expect(baseElement).toBeTruthy();
  });
});
