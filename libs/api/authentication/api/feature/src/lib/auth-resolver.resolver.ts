import { AuthService } from '@carpool/api/authentication/service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<User | null> {
    return await this.authService.login(email, password);
  }
}
