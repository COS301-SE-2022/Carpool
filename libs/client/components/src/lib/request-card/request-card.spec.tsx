import { render } from '@testing-library/react';

import RequestCard from './request-card';

describe('RequestCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequestCard />);
    expect(baseElement).toBeTruthy();
  });
});
