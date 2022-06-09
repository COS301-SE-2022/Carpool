import { render } from '@testing-library/react';

import ChatScreen from './chat-screen';

describe('ChatScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatScreen />);
    expect(baseElement).toBeTruthy();
  });
});
