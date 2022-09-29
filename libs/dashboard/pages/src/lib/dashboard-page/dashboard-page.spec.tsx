import { render } from '@testing-library/react';

import DashboardPage from './dashboard-page';

describe('DashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
