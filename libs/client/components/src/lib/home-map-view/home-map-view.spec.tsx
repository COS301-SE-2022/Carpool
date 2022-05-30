import { render } from '@testing-library/react';

import HomeMapView from './home-map-view';

describe('HomeMapView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeMapView />);
    expect(baseElement).toBeTruthy();
  });
});
