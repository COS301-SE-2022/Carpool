import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip, Booking, Location } from '@prisma/client';
import { TripsUpdate } from '@carpool/api/trips/entities';

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

  async findTripById(id: string): Promise<Trip> {
    return this.prisma.trip.findUnique({
      where: {
        tripId: id,
      },
    });
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
    });

    const tripsByDate = [];

    if (allTrips.length !== 0) {
      allTrips.map((trip) => {
        if (formatDate(`${trip.tripDate}`) === formatDate(date)) {
          tripsByDate.push(trip);
        }
      });

      console.log(tripsByDate);

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

  async cancelTrip(id: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        tripId: id,
      },
      data: {
        status: 'cancelled',
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
