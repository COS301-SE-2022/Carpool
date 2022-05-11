import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';
import { UserLoginQuery } from './queries/auth-query.query';
import {
  UserRegisterCommand,
  UserVerifyCommand,
} from './commands/auth-command.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    return await this.queryBus.execute(new UserLoginQuery(email, password));
  }

  async register(
    name: string,
    surname: string,
    email: string,
    university: string,
    studentNumber: string,
    password: string
  ): Promise<User | null> {
    return await this.commandBus.execute(
      new UserRegisterCommand(
        name,
        surname,
        email,
        university,
        studentNumber,
        password
      )
    );
  }

  async verifyEmail(id: string): Promise<boolean> {
    return await this.commandBus.execute(new UserVerifyCommand(id));
  }
}
