import { render } from '@testing-library/react';

import DashboardRedux from './dashboard-redux';

describe('DashboardRedux', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardRedux />);
    expect(baseElement).toBeTruthy();
  });
});
