import { User } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  FindUserByIdQuery,
  UserLoginQuery,
  ForgotPasswordQuery,
} from './auth-query.query';

@QueryHandler(UserLoginQuery)
export class UserLoginHandler implements IQueryHandler<UserLoginQuery> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: UserLoginQuery): Promise<User | null> {
    return await this.authRepository.login(query.email, query.password);
  }
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindUserByIdQuery): Promise<User | null> {
    return await this.authRepository.findUserById(query.id);
  }
}

@QueryHandler(ForgotPasswordQuery)
export class ForgotPasswordHandler
  implements IQueryHandler<ForgotPasswordQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: ForgotPasswordQuery): Promise<User | null> {
    return await this.authRepository.forgotPassword(query.email);
  }
}
