import { User } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserRegisterCommand, UserVerifyCommand } from './auth-command.command';
import { UserInput } from '@carpool/api/authentication/entities';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
  implements ICommandHandler<UserRegisterCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: UserRegisterCommand): Promise<User | null> {
    const { name, surname, email, university, studentNumber, password } =
      command;

    const user = new UserInput();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.university = university;
    user.studentNumber = studentNumber;
    user.password = password;

    return await this.authRepository.register(user);
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
