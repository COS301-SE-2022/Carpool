export class UserLoginQuery {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
