import { AuthService } from '@carpool/api/authentication/service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserLogin } from '@carpool/api/authentication/entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserLogin)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<UserLogin | null> {
    const userObj = await this.authService.login(email, password);

    if (userObj) {
      const user = new UserLogin();
      user.id = userObj.id;
      user.email = userObj.email;

      if (userObj.isValidated) {
        user.token = 'generate';
      } else {
        user.token = '';
      }

      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  }

  @Mutation(() => UserLogin)
  async register(
    @Args('name') name: string,
    @Args('surname') surname: string,
    @Args('email') email: string,
    @Args('university') university: string,
    @Args('studentNumber') studentNumber: string,
    @Args('password') password: string
  ): Promise<UserLogin | null> {
    const userObj = await this.authService.register(
      name,
      surname,
      email,
      university,
      studentNumber,
      password
    );

    if (userObj) {
      const user = new UserLogin();
      user.id = userObj.id;
      user.email = userObj.email;
      user.verificationCode = `${Math.floor(100000 + Math.random() * 900000)}`;

      const date = new Date();
      date.setDate(date.getDate() + 1);
      user.expires = date;

      console.log('before email');

      await this.authService.sendVerificationEmail(
        user.email,
        user.verificationCode
      );

      console.log('after email');

      return user;
    } else {
      throw new Error('Something went wrong!');
    }
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('id') id: string): Promise<boolean> {
    return await this.authService.verifyEmail(id);
  }
}
