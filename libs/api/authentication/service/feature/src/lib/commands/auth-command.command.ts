export class UserRegisterCommand {
  constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly university: string,
    public readonly studentNumber: string,
    public readonly password: string,
    public readonly cellNumber: string
  ) {}
}

export class DriverRegisterCommand {
  constructor(
    public readonly ID: string,
    public readonly licensePlate: string,
    public readonly carModel: string,
    public readonly userId: string
  ) {}
}

export class UserVerifyCommand {
  constructor(public readonly id: string) {}
}

export class UserUpdateCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly university: string,
    public readonly studentNumber: string,
    public readonly cellNumber: string
  ) {}
}
