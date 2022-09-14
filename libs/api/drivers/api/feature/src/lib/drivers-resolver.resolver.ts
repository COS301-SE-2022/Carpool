import { User, Driver } from '@carpool/api/authentication/entities';
import { DriversService } from '@carpool/api/drivers/service';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { AuthService } from '@carpool/api/authentication/service';

@Resolver(() => Driver)
export class DriversResolver {
  constructor(
    private readonly driversService: DriversService,
    private readonly authService: AuthService
  ) {}

  @ResolveField(() => User)
  async user(@Root() driver: Driver): Promise<User> {
    return await this.authService.findUserById(driver.userId);
  }

  /**
   * Query to find a driver profile
   * @param {string} id The id of the driver to find
   * @returns {Promise<Trip[]>}
   */
  @Query(() => Driver)
  async findDriverProfile(@Args('userId') userId: string): Promise<Driver> {
    return await this.driversService.findDriverProfile(userId);
  }
}
