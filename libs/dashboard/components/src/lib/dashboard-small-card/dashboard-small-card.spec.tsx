import { render } from '@testing-library/react';

import DashboardSmallCard from './dashboard-small-card';

describe('DashboardSmallCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardSmallCard />);
    expect(baseElement).toBeTruthy();
  });
});
