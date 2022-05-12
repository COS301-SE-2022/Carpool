export class UserLoginQuery {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class FindUserByIdQuery {
  constructor(public readonly id: string) {}
}
