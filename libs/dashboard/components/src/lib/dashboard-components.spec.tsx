import { render } from '@testing-library/react';

import DashboardComponents from './dashboard-components';

describe('DashboardComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardComponents />);
    expect(baseElement).toBeTruthy();
  });
});
