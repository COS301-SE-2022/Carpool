import { render } from '@testing-library/react';

import MapboxTest from './mapbox-test';

describe('MapboxTest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapboxTest />);
    expect(baseElement).toBeTruthy();
  });
});
