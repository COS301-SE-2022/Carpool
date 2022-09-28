import { AuthService } from '@carpool/api/authentication/service';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import {
  UserLogin,
  User,
  UserUpdate,
  Driver,
  ForgotPassword,
  TopUniversities,
  AdminUser,
  AdminUserReturn,
} from '@carpool/api/authentication/entities';
import { DriversService } from '@carpool/api/drivers/service';
import { TripsService } from '@carpool/api/trips/service';
import { Trip, Booking } from '@carpool/api/trips/entities';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly driversService: DriversService,
    private readonly tripsService: TripsService
  ) {}

  @ResolveField(() => [Trip])
  async tripsCreated(@Root() user: User): Promise<Trip[]> {
    return await this.tripsService.findByDriver(user.id);
  }

  @ResolveField(() => [Booking])
  async bookings(@Root() user: User): Promise<Booking[]> {
    return await this.tripsService.findBookingsByUser(user.id);
  }

  @ResolveField(() => Driver)
  async driver(@Root() user: User): Promise<Driver> {
    return await this.driversService.findDriverProfile(user.id);
  }

  @Mutation(() => User)
  async updateUserImage(
    @Args('id') id: string,
    @Args('image') image: string
  ): Promise<User> {
    return await this.authService.updateUserImage(id, image);
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User | null> {
    return await this.authService.findUserById(id);
  }

  @Query(() => [User])
  async findTopUsers(): Promise<User[]> {
    return await this.authService.findTopUsers();
  }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.authService.findAllUsers();
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

  @Query(() => AdminUserReturn)
  async adminLogin(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<AdminUserReturn | null> {
    const userObj = await this.authService.adminLogin(email, password);

    if (userObj) {
      const user = new AdminUserReturn();
      user.id = userObj.id;
      user.email = userObj.email;
      user.name = userObj.name;
      user.surname = userObj.surname;

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
