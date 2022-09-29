import { render } from '@testing-library/react';

import DashboardTopUniversities from './dashboard-top-universities';

describe('DashboardTopUniversities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardTopUniversities />);
    expect(baseElement).toBeTruthy();
  });
});
