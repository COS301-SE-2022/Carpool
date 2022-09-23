import { User, Driver } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import {
  UserRegisterCommand,
  UserUpdateCommand,
  UserVerifyCommand,
  DriverRegisterCommand,
  ResetPasswordCommand,
} from './auth-command.command';
import {
  UserInput,
  UserUpdate,
  DriverInput,
} from '@carpool/api/authentication/entities';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
  implements ICommandHandler<UserRegisterCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: UserRegisterCommand): Promise<User | null> {
    const {
      name,
      surname,
      email,
      university,
      studentNumber,
      password,
      cellNumber,
    } = command;

    const user = new UserInput();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.university = university;
    user.studentNumber = studentNumber;
    user.password = password;
    user.cellNumber = cellNumber;

    return await this.authRepository.register(user);
  }
}

@CommandHandler(DriverRegisterCommand)
export class DriverRegisterHandler
  implements ICommandHandler<DriverRegisterCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: DriverRegisterCommand): Promise<Driver | null> {
    const { userId, licensePlate, carModel, ID } = command;

    const driver = new DriverInput();
    driver.userId = userId;
    driver.licensePlate = licensePlate;
    driver.carModel = carModel;
    driver.ID = ID;

    return await this.authRepository.registerDriver(driver);
  }
}

@CommandHandler(UserVerifyCommand)
export class UserVerifyHandler implements ICommandHandler<UserVerifyCommand> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: UserVerifyCommand): Promise<boolean> {
    const { id } = command;
    return await this.authRepository.validateEmail(id);
  }
}

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: UserUpdateCommand): Promise<UserUpdate | null> {
    const { id, name, surname, email, university, studentNumber, cellNumber } =
      command;

    const user = new UserUpdate();
    user.id = id;
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.university = university;
    user.studentNumber = studentNumber;
    user.cellNumber = cellNumber;

    return await this.authRepository.updateUser(user);
  }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: ResetPasswordCommand): Promise<User | null> {
    const { email, password } = command;

    return await this.authRepository.resetPassword(email, password);
  }
}
