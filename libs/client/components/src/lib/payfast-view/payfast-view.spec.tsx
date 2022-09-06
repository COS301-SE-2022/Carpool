import { render } from '@testing-library/react';

import PayfastView from './payfast-view';

describe('PayfastView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PayfastView />);
    expect(baseElement).toBeTruthy();
  });
});
