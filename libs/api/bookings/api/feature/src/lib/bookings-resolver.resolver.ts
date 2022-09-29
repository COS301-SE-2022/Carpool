import { User } from '@carpool/api/authentication/entities';
import { Booking, Trip, Location } from '@carpool/api/trips/entities';
import { TripsService } from '@carpool/api/trips/service';
import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { AuthService } from '@carpool/api/authentication/service';
import { PrismaService } from '@carpool/api/prisma';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class PickupLocation {
  @Field(() => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  bookingId: string;
}

@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService
  ) {}

  @ResolveField(() => User)
  async user(@Root() booking: Booking): Promise<User> {
    return await this.authService.findUserById(booking.userId);
  }

  @ResolveField(() => Trip)
  async trip(@Root() booking: Booking): Promise<Trip> {
    return await this.tripsService.findTripById(booking.tripId);
  }

  @ResolveField(() => PickupLocation)
  async pickUp(@Root() booking: Booking): Promise<PickupLocation> {
    return await this.findPickupLocation(booking.bookingId);
  }

  async findPickupLocation(
    @Args('bookingId') bookingId: string
  ): Promise<PickupLocation> {
    return await this.prisma.pickupLocation.findUnique({
      where: {
        bookingId: bookingId,
      },
    });
  }

  @Query(() => [Booking])
  async findAllTripRequests(
    @Args('userId') userId: string
  ): Promise<Booking[]> {
    return await this.tripsService.findAllTripRequests(userId);
  }
}
