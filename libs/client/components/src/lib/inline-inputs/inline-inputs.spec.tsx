import { render } from '@testing-library/react';

import InlineInputs from './inline-inputs';

describe('InlineInputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InlineInputs />);
    expect(baseElement).toBeTruthy();
  });
});
