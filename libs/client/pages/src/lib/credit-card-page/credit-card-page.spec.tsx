import { render } from '@testing-library/react';

import CreditCard from './credit-card-page';

describe('CreditCard', () => {
  it('It should render successfully', () => {
    const { baseElement} = render(<CreditCard />);
    expect(baseElement).toBeTruthy();
  });
});
