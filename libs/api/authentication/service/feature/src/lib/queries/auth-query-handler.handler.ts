import { User } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserLoginQuery } from './auth-query.query';

@QueryHandler(UserLoginQuery)
export class UserLoginHandler implements IQueryHandler<UserLoginQuery> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: UserLoginQuery): Promise<User | null> {
    return await this.authRepository.login(query.email, query.password);
  }
}
