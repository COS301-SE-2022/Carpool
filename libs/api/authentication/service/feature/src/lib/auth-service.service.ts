import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';
import { UserLoginQuery } from './queries/auth-query.query';

@Injectable()
export class AuthService {
  constructor(private readonly queryBus: QueryBus) {}

  async login(email: string, password: string): Promise<User | null> {
    return await this.queryBus.execute(new UserLoginQuery(email, password));
  }
}
