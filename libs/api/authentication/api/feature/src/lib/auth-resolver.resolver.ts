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

  // signup
  // enter details
  // validate email format -> frontend
  // check if email already exists
  // create user in DB with isValidated == false
  // set user in redux -> frontend
  // set user in localstorage -> frontend
  // set empty token
  // send confirmation code
  // direct to confirm email page -> frontend
  // if entered correctly -> set isValidated to true
  // update user in DB with isValidated == true
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

      return user;
    } else {
      throw new Error('Something went wrong!');
    }
  }
}
