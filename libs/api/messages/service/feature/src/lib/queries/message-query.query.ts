export class GetMessagesQuery {
  constructor(
    public readonly senderId: string,
    public readonly receiverId: string
  ) {}
}
