import { render } from '@testing-library/react';

import DashboardRecentUsers from './dashboard-recent-users';

describe('DashboardRecentUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardRecentUsers />);
    expect(baseElement).toBeTruthy();
  });
});
