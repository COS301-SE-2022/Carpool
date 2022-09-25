import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip, Booking, Location, Review } from '@prisma/client';
import { TripsUpdate, TripByMonth } from '@carpool/api/trips/entities';

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
    SELECT count(trip_id) AS trips, TO_CHAR(trip_date, 'Mon')
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

  async findUpcomingTrip(id: string): Promise<Trip> {
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

    return trips[0];
  }

  async findByDriver(driverId: string): Promise<Trip[]> {
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
    return this.prisma.booking.update({
      where: {
        bookingId: id,
      },
      data: {
        status: 'paid',
      },
    });
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
    return this.prisma.booking.create({
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

    await this.prisma.booking.update({
      where: {
        bookingId: bookingId,
      },
      data: {
        status: 'unpaid',
      },
    });

    return trip;
  }

  async declineTripRequest(bookingId: string): Promise<Booking> {
    return this.prisma.booking.update({
      where: {
        bookingId: bookingId,
      },
      data: {
        status: 'declined',
      },
    });
  }

  async startTrip(id: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        status: 'active',
      },
    });
  }

  async endTrip(id: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        status: 'completed',
      },
    });
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
