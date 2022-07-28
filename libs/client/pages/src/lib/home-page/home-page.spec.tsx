import { render } from '@testing-library/react';

import HomePage from './home-page';

const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('HomePage', () => {
  it('should render successfully', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps({});
    });

    const { baseElement } = render(<HomePage {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
