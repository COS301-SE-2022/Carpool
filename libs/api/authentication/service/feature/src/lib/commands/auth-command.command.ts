export class UserRegisterCommand {
  constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string,
    public readonly university: string,
    public readonly studentNumber: string
  ) {}
}
