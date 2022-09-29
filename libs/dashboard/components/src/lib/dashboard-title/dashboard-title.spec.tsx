import { render } from '@testing-library/react';

import DashboardTitle from './dashboard-title';

describe('DashboardTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardTitle />);
    expect(baseElement).toBeTruthy();
  });
});
