import { User } from '@carpool/api/authentication/entities';
import {
  Trip,
  Booking,
  Location,
  BookingStatusUpdate,
} from '@carpool/api/trips/entities';
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

  /**
   * Query to find all trips
   * @returns {Promise<Trip[]>}
   */
  @Query(() => [Trip])
  async findAllTrips(): Promise<Trip[]> {
    return await this.tripsService.findAll();
  }

  /**
   * Query to find a trip by id
   * @param {string} id The id of the trip to find
   * @returns {Promise<Trip>}
   */
  @Query(() => Trip)
  async findTripById(@Args('id') id: string): Promise<Trip> {
    return await this.tripsService.findTripById(id);
  }

  /**
   * Query to find trips by driver id
   * @param {string} id The id of the driver to find the trips by
   * @returns {Promise<Trip[]>}
   */
  @Query(() => [Trip])
  async findByDriver(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByDriver(id);
  }

  /**
   * Query to find trips by passenger id
   * @param {string} id The id of the passenger to find the trips by
   * @returns {Promise<Trip[]>}
   */
  @Query(() => [Trip])
  async findByPassenger(@Args('id') id: string): Promise<Trip[]> {
    return await this.tripsService.findByPassenger(id);
  }

  @Query(() => Booking)
  async findBookingByTripAndUserId(
    @Args('tripId') tripId: string,
    @Args('userId') userId: string
  ): Promise<Booking> {
    return await this.tripsService.findBookingByTripAndUserId(tripId, userId);
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

  @Mutation(() => Booking)
  async updatePaymentStatus(
    @Args('bookingId') bookingId: string
  ): Promise<BookingStatusUpdate> {
    return await this.tripsService.updatePaymentStatus(bookingId);
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
    @Args('bookingId') bookingId: string
  ): Promise<Trip> {
    return await this.tripsService.acceptTripRequest(tripId, bookingId);
  }

  @Mutation(() => Booking)
  async declineTripRequest(
    @Args('bookingId') bookingId: string
  ): Promise<Booking> {
    return await this.tripsService.declineTripRequest(bookingId);
  }

  @Mutation(() => Trip)
  async startTrip(@Args('id') tripId: string): Promise<Trip> {
    return await this.tripsService.startTrip(tripId);
  }

  @Mutation(() => Trip)
  async endTrip(@Args('id') tripId: string): Promise<Trip> {
    return await this.tripsService.endTrip(tripId);
  }

  @Mutation(() => Trip)
  async driverCancelTrip(@Args('id') tripId: string): Promise<Trip> {
    return await this.tripsService.driverCancelTrip(tripId);
  }

  @Mutation(() => Trip)
  async passengerCancelTrip(
    @Args('userId') userId: string,
    @Args('id') tripId: string
  ): Promise<Trip> {
    return await this.tripsService.passengerCancelTrip(userId, tripId);
  }
}
