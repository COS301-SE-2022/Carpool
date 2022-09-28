import { render } from '@testing-library/react';

import NotificationsPage from './notifications-page';

describe('NotificationsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsPage />);
    expect(baseElement).toBeTruthy();
  });
});
