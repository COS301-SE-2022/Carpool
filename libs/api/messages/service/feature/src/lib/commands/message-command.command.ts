export class CreateMessageCommand {
  constructor(
    public readonly senderId: string,
    public readonly receiverId: string,
    public readonly message: string
  ) {}
}
