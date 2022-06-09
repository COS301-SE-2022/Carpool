import { render } from '@testing-library/react';

import SetPickupPage from './set-pickup-page';

describe('SetPickupPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetPickupPage />);
    expect(baseElement).toBeTruthy();
  });
});
