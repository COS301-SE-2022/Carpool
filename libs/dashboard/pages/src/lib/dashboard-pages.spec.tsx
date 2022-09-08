import { render } from '@testing-library/react';

import DashboardPages from './dashboard-pages';

describe('DashboardPages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardPages />);
    expect(baseElement).toBeTruthy();
  });
});
