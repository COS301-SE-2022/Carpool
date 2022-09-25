import { render } from '@testing-library/react';

import DashboardTopUsers from './dashboard-top-users';

describe('DashboardTopUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardTopUsers />);
    expect(baseElement).toBeTruthy();
  });
});
