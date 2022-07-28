import { User } from '@carpool/api/authentication/entities';
import { Trip, Booking, Location, BookingStatusUpdate } from '@carpool/api/trips/entities';
import { TripsService } from '@carpool/api/trips/service';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { AuthService } from '@carpool/api/authentication/service';
import { acceptTripRequest } from '@carpool/client/store';

@Resolver(() => Trip)
export class TripsResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly authService: AuthService
  ) {}

  @ResolveField(() => [Booking])
  async coordinates(@Root() trip: Trip): Promise<Location[]> {
    return await this.tripsService.findCoordinatesByTrip(trip.tripId);
  }

  @ResolveField(() => [Location])
  async passengers(@Root() trip: Trip): Promise<Booking[]> {
    return await this.tripsService.findBookingByTrip(trip.tripId);
  }

  @ResolveField(() => User)
  async driver(@Root() trip: Trip): Promise<User> {
    return await this.authService.findUserById(trip.driverId);
  }

  @Query(() => [Trip])
  async findAllTrips(): Promise<Trip[]> {
    return await this.tripsService.findAll();
  }

  @Query(() => Trip)
  async findTripById(@Args('id') id: string): Promise<Trip> {
    return await this.tripsService.findTripById(id);
  }

  @Query(() => [Trip])
  async findByDriver(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByDriver(id);
  }

  @Query(() => [Trip])
  async findByPassenger(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByPassenger(id);
  }

  @Query(() => [Trip])
  async findByConfirmedTrips(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByConfirmedTrips(id);
  }

  @Query(() => [Trip])
  async findByRequestedTrips(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByRequestedTrips(id);
  }

  @Query(() => [Trip])
  async searchTrips(
    @Args('date') date: string,
    @Args('startLongitude') startLongitude: string,
    @Args('startLatitude') startLatitude: string,
    @Args('destinationLongitude') destinationLongitude: string,
    @Args('destinationLatitude') destinationLatitude: string
  ): Promise<Trip[] | null> {
    const trips = await this.tripsService.searchTrips(date);

    const searchResults = [];

    if (trips.length !== 0) {
      trips.map((trip) => {
        if (
          trip.coordinates[0].longitude === startLongitude &&
          trip.coordinates[0].latitude === startLatitude &&
          trip.coordinates[1].longitude === destinationLongitude &&
          trip.coordinates[1].latitude === destinationLatitude
        ) {
          searchResults.push(trip);
        }
      });
    }

    return searchResults;
  }

  // @Query(() => [Trip])
  // async searchTrips(
  //   @Args('startLocation') startLocation: string,
  //   @Args('endLocation') endLocation: string
  // ): Promise<Trip[]> {
  //   return await this.tripsService.searchTrips(startLocation, endLocation);
  // }

  @Mutation(() => Trip)
  async create(
    @Args('driver') driver: string,
    @Args('tripDate') tripDate: string,
    @Args('seatsAvailable') seatsAvailable: string,
    @Args('price') price: string,
    @Args('status') status: string,
    @Args('startLocationAddress') startLocationAddress: string,
    @Args('startLocationLongitude') startLocationLongitude: string,
    @Args('startLocationLatitude') startLocationLatitude: string,
    @Args('destinationAddress') destinationAddress: string,
    @Args('destinationLongitude') destinationLongitude: string,
    @Args('destinationLatitude') destinationLatitude: string
  ): Promise<Trip> {
    return await this.tripsService.create(
      driver,
      tripDate,
      seatsAvailable,
      price,
      status,
      startLocationAddress,
      startLocationLongitude,
      startLocationLatitude,
      destinationAddress,
      destinationLongitude,
      destinationLatitude
    );
  }

  // @Mutation(() => Trip)
  // async delete(tripId: string): Promise<Trip> {
  //   return await this.tripsService.delete(tripId);
  // }

  // @Mutation(() => Trip)
  // async update(
  //   tripId: string,
  //   seatsAvailable: number,
  //   price: number,
  //   status: string
  // ): Promise<Trip> {
  //   return await this.tripsService.update(
  //     tripId,
  //     seatsAvailable,
  //     price,
  //     status
  //   );
  // }

  @Mutation(() => Booking)
  async updatePaymentStatus(
    @Args('bookingId') bookingId: string,
  ): Promise<BookingStatusUpdate> {
    return await this.tripsService.updatePaymentStatus(
      bookingId
    );
  }

  @Mutation(() => Booking)
  async bookTrip(
    @Args('tripId') tripId: string,
    @Args('passengerId') passengerId: string,
    @Args('seatsBooked') seatsBooked: string,
    @Args('status') status: string,
    @Args('price') price: string,
    @Args('address') address: string,
    @Args('longitude') longitude: string,
    @Args('latitude') latitude: string
  ): Promise<Booking | null> {
    return await this.tripsService.bookTrip(
      passengerId,
      tripId,
      seatsBooked,
      status,
      price,
      address,
      longitude,
      latitude
    );
  }

  @Mutation(() => Trip)
  async acceptTripRequest(
    @Args('id') tripId: string,
    @Args('seatsAvailable') seatsAvailable: string,
    @Args('status') status: string
  ): Promise<Trip> {
    return await this.tripsService.acceptTripRequest(
      tripId,
      seatsAvailable,
      status
    );
  }

  @Mutation(() => Trip)
  async startTrip(
    @Args('id') tripId: string,
    @Args('status') status: string
  ): Promise<Trip> {
    return await this.tripsService.startTrip(tripId, status);
  }

  @Mutation(() => Trip)
  async endTrip(
    @Args('id') tripId: string,
    @Args('status') status: string
  ): Promise<Trip> {
    return await this.tripsService.endTrip(tripId, status);
  }
}
