import { render } from '@testing-library/react';

import ChatList from './chat-list';

describe('ChatList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatList />);
    expect(baseElement).toBeTruthy();
  });
});
