import { User } from '@prisma/client';
import { AuthRepository } from '@carpool/api/authentication/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
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
} from './auth-query.query';
import { TopUniversities } from '@carpool/api/authentication/entities';

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

@QueryHandler(FindTotalUsersQuery)
export class FindTotalUsersHandler
  implements IQueryHandler<FindTotalUsersQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindTotalUsersQuery): Promise<number> {
    return await this.authRepository.findTotalUsers();
  }
}

@QueryHandler(FindTotalDriversQuery)
export class FindTotalDriversHandler
  implements IQueryHandler<FindTotalDriversQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindTotalDriversQuery): Promise<number> {
    return await this.authRepository.findTotalDrivers();
  }
}

@QueryHandler(FindRecentUsersQuery)
export class FindRecentUsersHandler
  implements IQueryHandler<FindRecentUsersQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindRecentUsersQuery): Promise<User[]> {
    return await this.authRepository.findRecentUsers();
  }
}

@QueryHandler(FindTopUniversitiesQuery)
export class FindTopUniversitiesHandler
  implements IQueryHandler<FindTopUniversitiesQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindTopUniversitiesQuery): Promise<TopUniversities[]> {
    return await this.authRepository.findTopUniversities();
  }
}

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindAllUsersQuery): Promise<User[]> {
    return await this.authRepository.findAllUsers();
  }
}

@QueryHandler(FindTopUsersQuery)
export class FindTopUsersHandler implements IQueryHandler<FindTopUsersQuery> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindTopUsersQuery): Promise<User[]> {
    return await this.authRepository.findTopUsers();
  }
}
