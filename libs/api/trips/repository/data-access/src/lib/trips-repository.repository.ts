import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip, Booking, Location, Review, Notification } from '@prisma/client';
import {
  TripsUpdate,
  TripByMonth,
  BookingRequest,
} from '@carpool/api/trips/entities';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${day} ${monthNames[month]} ${year}`;
};

@Injectable()
export class TripsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      orderBy: {
        tripDate: 'desc',
      },
    });
  }

  async findAllNotifications(id: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        userId: id,
      },
    });
  }

  async deleteAllMessageNotifications(userId: string): Promise<string> {
    await this.prisma.notification.deleteMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            type: 'message',
          },
        ],
      },
    });

    return 'success';
  }

  async deleteRequestNotification(
    userId: string,
    entity: string
  ): Promise<string> {
    await this.prisma.notification.deleteMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            entity: entity,
          },
          {
            type: 'bookingRequest',
          },
        ],
      },
    });

    return 'success';
  }

  async deleteAcceptedNotification(
    userId: string,
    entity: string
  ): Promise<string> {
    await this.prisma.notification.deleteMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            entity: entity,
          },
          {
            type: 'bookingAccepted',
          },
        ],
      },
    });

    return 'success';
  }

  async findTripsForMonth(): Promise<number> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const trips = await this.prisma.trip.aggregate({
      where: {
        tripDate: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      _count: true,
    });

    return trips._count;
  }

  async findBookingsForMonth(): Promise<number> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const bookings = await this.prisma.booking.aggregate({
      where: {
        trip: {
          tripDate: {
            gte: firstDay,
            lte: lastDay,
          },
        },
      },
      _count: true,
    });

    return bookings._count;
  }

  async findBookingsByUser(id: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findTripsByMonth(): Promise<TripByMonth[]> {
    const trips = await this.prisma.$queryRaw<TripByMonth[]>`
    SELECT count(trip_id)::int AS trips, TO_CHAR(trip_date, 'Mon')
    AS month FROM trip GROUP BY TO_CHAR(trip_date, 'Mon');
    `;

    return trips;
  }

  async findTripById(id: string): Promise<Trip> {
    return this.prisma.trip.findUnique({
      where: {
        tripId: id,
      },
    });
  }

  async findUpcomingTrip(id: string): Promise<Trip | null> {
    const trips = await this.prisma.trip.findMany({
      where: {
        OR: [
          {
            driverId: id,
          },
          {
            passengers: {
              some: {
                userId: id,
              },
            },
          },
        ],
        tripDate: {
          gte: new Date(),
        },
        status: {
          in: ['active', 'confirmed', 'paid'],
        },
      },
      orderBy: {
        tripDate: 'desc',
      },
    });

    if (trips.length === 0) {
      return null;
    }

    return trips[0];
  }

  async findByDriver(driverId: string): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      where: {
        AND: [
          { driverId: driverId },
          {
            OR: [
              {
                tripDate: {
                  lt: new Date(),
                },
              },
              { status: 'completed' },
            ],
          },
        ],
      },
    });
  }

  async findByDriverForDashboard(driverId: string): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      where: {
        driverId: driverId,
      },
    });
  }

  async findByPassenger(passengerId: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        passengers: {
          some: {
            userId: passengerId,
          },
        },
        tripDate: {
          lt: new Date(),
        },
        status: 'completed',
      },
    });
  }

  async findByConfirmedTrips(passengerId: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        passengers: {
          some: {
            userId: passengerId,
            status: 'unpaid',
          },
        },
        status: 'confirmed',
      },
    });
  }

  async findByRequestedTrips(passengerId: string): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where: {
        passengers: {
          some: {
            userId: passengerId,
            status: 'unpaid',
          },
        },
        status: 'requested',
      },
    });
    return trips;
  }

  async findByPassengerReviews(passengerId: string): Promise<Trip[]> {
    console.log(passengerId);

    return this.prisma.trip.findMany({
      where: {
        passengers: {
          some: {
            userId: passengerId,
            reviewed: false,
          },
        },
        status: 'completed',
      },
    });
  }

  async findAllPassengers(tripID: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        tripId: tripID,
      },
    });
  }

  async findByDriverReviews(DriverId: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        driverId: DriverId,
        reviewed: false,
        status: 'completed',
      },
    });
  }

  async findBookingByTrip(tripID: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        tripId: tripID,
      },
    });
  }

  async findTripByBooking(bookingId: string): Promise<BookingRequest | null> {
    const trips = await this.prisma.trip.findMany({
      where: {
        passengers: {
          some: {
            bookingId: bookingId,
          },
        },
      },
    });

    if (trips.length !== 0) {
      const booking = await this.prisma.booking.findUnique({
        where: {
          bookingId: bookingId,
        },
      });

      const tripLocation = await this.prisma.location.findMany({
        where: {
          tripId: trips[0].tripId,
        },
      });

      const passenger = await this.prisma.user.findUnique({
        where: {
          id: booking.userId,
        },
      });

      const pickup = await this.prisma.pickupLocation.findUnique({
        where: {
          bookingId: bookingId,
        },
      });

      const bookingRequest = new BookingRequest();

      bookingRequest.tripId = trips[0].tripId;
      bookingRequest.bookingId = bookingId;
      bookingRequest.passengerId = booking.userId;
      bookingRequest.tripDate = trips[0].tripDate;
      bookingRequest.passengerName = `${passenger.name} ${passenger.surname}`;
      bookingRequest.passengerPic = passenger.profilePic;
      bookingRequest.passengerRating = passenger.avgRating;
      bookingRequest.startAddress = tripLocation[0].address;
      bookingRequest.startLat = tripLocation[0].latitude;
      bookingRequest.startLong = tripLocation[0].longitude;
      bookingRequest.endAddress = tripLocation[1].address;
      bookingRequest.endLat = tripLocation[1].latitude;
      bookingRequest.endLong = tripLocation[1].longitude;
      bookingRequest.pickupAddress = pickup.address;
      bookingRequest.pickupLat = pickup.latitude;
      bookingRequest.pickupLong = pickup.longitude;

      return bookingRequest;
    }

    return null;
  }

  async findBookingById(bookingId: string): Promise<Booking> {
    return this.prisma.booking.findUnique({
      where: {
        bookingId: bookingId,
      },
    });
  }

  async findBookingByTripAndUserId(
    tripID: string,
    userId: string
  ): Promise<Booking> {
    const booking = await this.prisma.booking.findMany({
      where: {
        tripId: tripID,
        userId: userId,
      },
    });

    return booking[0];
  }

  async findCoordinatesByTrip(tripID: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        tripId: tripID,
      },
    });
  }

  async create(
    driver: string,
    tripDate: string,
    seatsAvailable: string,
    price: string,
    status: string,
    startLocationAddress: string,
    startLocationLongitude: string,
    startLocationLatitude: string,
    destinationAddress: string,
    destinationLongitude: string,
    destinationLatitude: string
  ): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        tripDate: tripDate,
        seatsAvailable: parseInt(seatsAvailable),
        price: parseFloat(price),
        status: status,
        coordinates: {
          create: [
            {
              address: startLocationAddress,
              latitude: startLocationLatitude,
              longitude: startLocationLongitude,
            },
            {
              address: destinationAddress,
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            },
          ],
        },
        driver: {
          connect: {
            id: driver,
          },
        },
      },
    });
  }

  async postReview(
    byId: string,
    forId: string,
    tripId: string,
    role: string,
    comment: string,
    rating: string
  ): Promise<Review | null> {
    //** NOTIFY DRIVER OR PASSENGER */

    return this.prisma.review.create({
      data: {
        byId: byId,
        forId: forId,
        tripId: tripId,
        role: role,
        comment: comment,
        rating: rating,
      },
    });
  }

  async updatePaymentStatus(id: string): Promise<Booking> {
    //** NOTIFY DRIVER */
    const booking = await this.prisma.booking.update({
      where: {
        bookingId: id,
      },
      data: {
        status: 'paid',
      },
    });

    const trip = await this.prisma.trip.update({
      where: {
        tripId: booking.tripId,
      },
      data: {
        seatsAvailable: {
          decrement: 1,
        },
      },
    });

    const notify = await this.prisma.notification.create({
      data: {
        userId: trip.driverId,
        message: `Your trip has been paid for by ${booking.userId}`,
        type: 'payment',
        entity: id,
      },
    });

    return booking;
  }

  async bookTrip(
    tripId: string,
    passengerId: string,
    seatsBooked: string,
    status: string,
    price: string,
    address: string,
    longitude: string,
    latitude: string
  ): Promise<Booking | null> {
    //** NOTIFY DRIVER */

    const trip = await this.prisma.trip.findUnique({
      where: {
        tripId: tripId,
      },
    });

    const passenger = await this.prisma.user.findUnique({
      where: {
        id: passengerId,
      },
    });

    const bookingObj = await this.prisma.booking.create({
      data: {
        trip: {
          connect: { tripId },
        },
        user: {
          connect: { id: passengerId },
        },
        seatsBooked: parseInt(seatsBooked),
        status: status,
        price: parseFloat(price),
        pickUp: {
          create: {
            address,
            latitude,
            longitude,
          },
        },
      },
    });

    const notify = await this.prisma.notification.create({
      data: {
        userId: trip.driverId,
        message: `You have a new booking request from ${passenger.name} ${passenger.surname}`,
        type: 'bookingRequest',
        entity: bookingObj.bookingId,
      },
    });

    return bookingObj;
  }

  async update(id: string, trips: TripsUpdate): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        seatsAvailable: trips.seatsAvailable,
        price: trips.price,
      },
    });
  }

  async updateReviewPassenger(id: string): Promise<Booking> {
    return this.prisma.booking.update({
      where: {
        bookingId: id,
      },
      data: {
        reviewed: true,
      },
    });
  }

  async updateReviewDriver(id: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        reviewed: true,
      },
    });
  }

  async delete(id: string): Promise<Trip> {
    return this.prisma.trip.delete({
      where: {
        tripId: id,
      },
    });
  }

  async searchTrips(date: string): Promise<Trip[]> {
    const allTrips = await this.prisma.trip.findMany({
      select: {
        tripId: true,
        tripDate: true,
        seatsAvailable: true,
        price: true,
        driverId: true,
        coordinates: true,
        driver: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        driver: {
          avgRating: 'desc',
        },
      },
    });

    const tripsByDate = [];

    if (allTrips.length !== 0) {
      allTrips.map((trip) => {
        if (formatDate(`${trip.tripDate}`) === formatDate(date)) {
          tripsByDate.push(trip);
        }
      });

      // console.log(tripsByDate);

      return tripsByDate;
    } else {
      return [];
    }
  }

  async acceptTripRequest(id: string, bookingId: string): Promise<Trip> {
    //** NOTIFY PASSENGER */

    const trip = await this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        seatsAvailable: {
          decrement: 1,
        },
      },
    });

    const booking = await this.prisma.booking.update({
      where: {
        bookingId: bookingId,
      },
      data: {
        status: 'unpaid',
      },
    });

    const notify = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        message: `Your booking request has been accepted`,
        type: 'bookingAccepted',
        entity: id,
      },
    });

    return trip;
  }

  async declineTripRequest(bookingId: string): Promise<Booking> {
    //** NOTIFY PASSENGER */

    const booking = await this.prisma.booking.update({
      where: {
        bookingId: bookingId,
      },
      data: {
        status: 'declined',
      },
    });

    const notify = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        message: `Your booking request has been declined`,
        type: 'bookingDeclined',
        entity: bookingId,
      },
    });

    return booking;
  }

  async startTrip(id: string): Promise<Trip> {
    //** NOTIFY PASSENGERS */

    const trip = await this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        status: 'active',
      },
    });

    const tripUpdated = await this.prisma.trip.findUnique({
      where: {
        tripId: id,
      },
      select: {
        passengers: {
          select: {
            userId: true,
          },
        },
      },
    });

    // console.log(tripUpdated);

    // tripUpdated.passengers.map(async (passenger) => {
    //   await this.prisma.notification.create({
    //     data: {
    //       userId: passenger.userId,
    //       message: `Your trip has started`,
    //       type: 'tripStarted',
    //       entity: id,
    //     },
    //   });
    // });

    return trip;
  }

  async endTrip(id: string): Promise<Trip> {
    //** NOTIFY PASSENGERS */

    const trip = await this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        status: 'completed',
      },
    });

    const tripUpdated = await this.prisma.trip.findUnique({
      where: {
        tripId: id,
      },
      select: {
        passengers: true,
      },
    });

    // tripUpdated.passengers.map(async (passenger) => {
    //   await this.prisma.notification.create({
    //     data: {
    //       userId: passenger.userId,
    //       message: `Your trip has ended`,
    //       type: 'tripEnded',
    //       entity: id,
    //     },
    //   });
    // });

    return trip;
  }

  async findAllTripRequests(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        trip: {
          driverId: userId,
        },
        status: 'requested',
      },
    });
  }
}
