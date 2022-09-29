import { render } from '@testing-library/react';

import TripsPage from './trips-page';

describe('TripsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripsPage />);
    expect(baseElement).toBeTruthy();
  });
});
