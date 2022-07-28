import { User } from '@carpool/api/authentication/entities';
import { Booking, Trip } from '@carpool/api/trips/entities';
import { TripsService } from '@carpool/api/trips/service';
import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { AuthService } from '@carpool/api/authentication/service';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly authService: AuthService
  ) {}

  @ResolveField(() => User)
  async user(@Root() booking: Booking): Promise<User> {
    return await this.authService.findUserById(booking.userId);
  }

  @ResolveField(() => Trip)
  async trip(@Root() booking: Booking): Promise<Trip> {
    return await this.tripsService.findTripById(booking.tripId);
  }

  @Query(() => [Booking])
  async findAllTripRequests(
    @Args('userId') userId: string
  ): Promise<Booking[]> {
    return await this.tripsService.findAllTripRequests(userId);
  }
}
