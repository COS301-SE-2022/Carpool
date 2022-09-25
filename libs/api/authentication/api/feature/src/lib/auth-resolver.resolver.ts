import { AuthService } from '@carpool/api/authentication/service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  UserLogin,
  User,
  UserUpdate,
  Driver,
  ForgotPassword,
  TopUniversities,
} from '@carpool/api/authentication/entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User | null> {
    return await this.authService.findUserById(id);
  }

  @Query(() => Number)
  async findTotalUsers(): Promise<number> {
    return await this.authService.findTotalUsers();
  }

  @Query(() => Number)
  async findTotalDrivers(): Promise<number> {
    return await this.authService.findTotalDrivers();
  }

  @Query(() => [User])
  async findRecentUsers(): Promise<User[]> {
    return await this.authService.findRecentUsers();
  }

  @Query(() => [TopUniversities])
  async findTopUniversities(): Promise<TopUniversities[]> {
    return await this.authService.findTopUniversities();
  }

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
      user.isDriver = userObj.isDriver;

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
    @Args('password') password: string,
    @Args('cellNumber') cellNumber: string
  ): Promise<UserLogin | null> {
    const userObj = await this.authService.register(
      name,
      surname,
      email,
      university,
      studentNumber,
      password,
      cellNumber
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

  @Query(() => ForgotPassword)
  async forgotPassword(@Args('email') email: string): Promise<ForgotPassword> {
    const userObj = await this.authService.forgotPassword(email);

    if (userObj) {
      const user = new ForgotPassword();
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

  @Mutation(() => User)
  async resetPassword(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return await this.authService.resetPassword(email, password);
  }

  @Mutation(() => Driver)
  async registerDriver(
    @Args('ID') ID: string,
    @Args('licensePlate') licensePlate: string,
    @Args('carModel') carModel: string,
    @Args('userId') userId: string
  ): Promise<Driver | null> {
    const driverObj = await this.authService.registerDriver(
      userId,
      licensePlate,
      carModel,
      ID
    );

    if (driverObj) {
      return driverObj;
    } else {
      throw new Error('Something went wrong!');
    }
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('id') id: string): Promise<boolean> {
    return await this.authService.verifyEmail(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('surname') surname: string,
    @Args('email') email: string,
    @Args('university') university: string,
    @Args('studentNumber') studentNumber: string,
    @Args('cellNumber') cellNumber: string
  ): Promise<UserUpdate | null> {
    return await this.authService.updateUser(
      id,
      name,
      surname,
      email,
      university,
      studentNumber,
      cellNumber
    );
  }
}
