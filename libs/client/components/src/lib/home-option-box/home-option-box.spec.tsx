import { render } from '@testing-library/react';

import HomeOptionBox from './home-option-box';

describe('HomeOptionBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeOptionBox />);
    expect(baseElement).toBeTruthy();
  });
});
