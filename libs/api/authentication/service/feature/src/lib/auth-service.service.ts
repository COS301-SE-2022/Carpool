import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  User,
  UserUpdate,
  Driver,
  TopUniversities,
} from '@carpool/api/authentication/entities';
import {
  FindUserByIdQuery,
  UserLoginQuery,
  ForgotPasswordQuery,
  FindTotalDriversQuery,
  FindTotalUsersQuery,
  FindRecentUsersQuery,
  FindTopUniversitiesQuery,
  FindAllUsersQuery,
  FindTopUsersQuery,
} from './queries/auth-query.query';
import {
  UserRegisterCommand,
  UserVerifyCommand,
  UserUpdateCommand,
  DriverRegisterCommand,
  ResetPasswordCommand,
} from './commands/auth-command.command';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
    private readonly mailerService: MailerService
  ) {}

  async findUserById(id: string): Promise<User | null> {
    return await this.queryBus.execute(new FindUserByIdQuery(id));
  }

  async login(email: string, password: string): Promise<User | null> {
    return await this.queryBus.execute(new UserLoginQuery(email, password));
  }

  async findTopUsers(): Promise<User[]> {
    return await this.queryBus.execute(new FindTopUsersQuery());
  }

  async findTotalUsers(): Promise<number> {
    return this.queryBus.execute(new FindTotalUsersQuery());
  }

  async findAllUsers(): Promise<User[]> {
    return this.queryBus.execute(new FindAllUsersQuery());
  }

  async findTotalDrivers(): Promise<number> {
    return this.queryBus.execute(new FindTotalDriversQuery());
  }

  async findRecentUsers(): Promise<User[]> {
    return this.queryBus.execute(new FindRecentUsersQuery());
  }

  async findTopUniversities(): Promise<TopUniversities[]> {
    return this.queryBus.execute(new FindTopUniversitiesQuery());
  }

  async register(
    name: string,
    surname: string,
    email: string,
    university: string,
    studentNumber: string,
    password: string,
    cellNumber: string
  ): Promise<User | null> {
    return await this.commandBus.execute(
      new UserRegisterCommand(
        name,
        surname,
        email,
        university,
        studentNumber,
        password,
        cellNumber
      )
    );
  }

  async forgotPassword(email: string): Promise<User | null> {
    return await this.queryBus.execute(new ForgotPasswordQuery(email));
  }

  async registerDriver(
    ID: string,
    licensePlate: string,
    carModel: string,
    userId: string
  ): Promise<Driver | null> {
    return await this.commandBus.execute(
      new DriverRegisterCommand(userId, licensePlate, carModel, ID)
    );
  }

  async verifyEmail(id: string): Promise<boolean> {
    return await this.commandBus.execute(new UserVerifyCommand(id));
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Greeting from NestJS NodeMailer',
      template: '/confirm_email',
      context: {
        code: code,
      },
    });
  }

  async updateUser(
    id: string,
    name: string,
    surname: string,
    email: string,
    university: string,
    studentNumber: string,
    cellNumber: string
  ): Promise<UserUpdate | null> {
    return await this.commandBus.execute(
      new UserUpdateCommand(
        id,
        name,
        surname,
        email,
        university,
        studentNumber,
        cellNumber
      )
    );
  }

  async resetPassword(email: string, password: string): Promise<User | null> {
    return await this.commandBus.execute(
      new ResetPasswordCommand(email, password)
    );
  }
}
