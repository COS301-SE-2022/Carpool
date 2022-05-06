import { User } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserRegisterCommand } from './auth-command.command';
import { UserInput } from '@carpool/api/authentication/entities';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
  implements ICommandHandler<UserRegisterCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: UserRegisterCommand): Promise<User | null> {
    const { name, surname, email, password, university, studentNumber } =
      command;

    const user = new UserInput();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = password;
    user.university = university;
    user.studentNumber = studentNumber;

    return await this.authRepository.register(user);
  }
}
