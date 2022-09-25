export class UserLoginQuery {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class FindUserByIdQuery {
  constructor(public readonly id: string) {}
}

export class ForgotPasswordQuery {
  constructor(public readonly email: string) {}
}

export class FindTotalUsersQuery {}

export class FindTotalDriversQuery {}

export class FindRecentUsersQuery {}

export class FindTopUniversitiesQuery {}

export class FindAllUsersQuery {}
