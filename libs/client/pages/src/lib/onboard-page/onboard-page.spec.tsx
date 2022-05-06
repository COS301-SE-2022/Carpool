import { render } from '@testing-library/react';

import OnboardPage from './onboard-page';

describe('OnboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
