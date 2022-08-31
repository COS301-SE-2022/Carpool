export const GET_MESSAGES = `
  query ($senderId: String!, $receiverId: String!) {
    getMessages(senderId: $senderId, receiverId: $receiverId) {
      id,
      message,
      senderId,
      receiverId,
      sender {
        id
        name
      },
      receiver {
        id
        name
      },
      createdAt
    }
  }
`;

export const SEND_MESSAGE = `
  mutation ($senderId: String!, $receiverId: String!, $message: String!) {
    createMessage(senderId: $senderId, receiverId: $receiverId, message: $message) {
      id,
      message,
      senderId,
      receiverId,
      sender {
        id
        name
      },
      receiver {
        id
        name
      },
      createdAt
    }
  }
`;
