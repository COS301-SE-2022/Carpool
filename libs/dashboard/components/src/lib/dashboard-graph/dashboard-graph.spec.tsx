import { render } from '@testing-library/react';

import DashboardGraph from './dashboard-graph';

describe('DashboardGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardGraph />);
    expect(baseElement).toBeTruthy();
  });
});
