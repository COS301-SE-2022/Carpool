export class GetMessagesQuery {
  constructor(
    public readonly senderId: string,
    public readonly receiverId: string
  ) {}
}

export class GetChatsQuery {
  constructor(public readonly userId: string) {}
}
