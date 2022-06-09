import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip, Booking, Location } from '@prisma/client';
import { TripsInput, TripsUpdate } from '@carpool/api/trips/entities';

@Injectable()
export class TripsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Trip[]> {
    return await this.prisma.trip.findMany();
  }

  async findByDriver(driverId: string): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      where: {
        driverId: driverId,
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

  async findBookingByTrip(tripID: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        tripId: tripID,
      },
    });
  }

  async findCoordinatesByTrip(tripID: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        tripId: tripID,
      },
    });
  }

  async create(trips: TripsInput): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        tripDate: trips.tripDate,
        seatsAvailable: trips.seatsAvailable,
        price: trips.price,
        coordinates: {
          create: [
            {
              address: trips.coordinates[0].address,
              latitude: trips.coordinates[0].latitude,
              longitude: trips.coordinates[0].longitude,
            },
            {
              address: trips.coordinates[1].address,
              latitude: trips.coordinates[1].latitude,
              longitude: trips.coordinates[1].longitude,
            },
          ],
        },
        driver: {
          connect: {
            id: trips.driverId,
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

  async delete(id: string): Promise<Trip> {
    return this.prisma.trip.delete({
      where: {
        tripId: id,
      },
    });
  }

  async searchTrips(date: string): Promise<Trip[]> {
    const tripsByDate = await this.prisma.trip.findMany({
      where: {
        tripDate: date,
      },
      include: {
        coordinates: true,
      },
    });

    // const searchResults = [];

    // if (tripsByDate.length !== 0) {
    //   tripsByDate.map((trip) => {
    //     if (
    //       trip.coordinates[0].longitude === startLongitude &&
    //       trip.coordinates[0].latitude === startLatitude &&
    //       trip.coordinates[1].longitude === destinationLongitude &&
    //       trip.coordinates[1].latitude === destinationLatitude
    //     ) {
    //       searchResults.push(trip);
    //     }
    //   });
    // }

    return tripsByDate;
  }
}
