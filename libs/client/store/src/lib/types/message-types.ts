export type MessageState = {
  messages: Message[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type MessageSendState = {
  message: Message | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Message = {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  sender: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export type Error = {
  message: string;
};
