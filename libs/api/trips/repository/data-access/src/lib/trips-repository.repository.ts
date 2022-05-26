import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip, Booking, Location } from '@prisma/client';
import {
  BookingInput,
  TripsInput,
  TripsUpdate,
} from '@carpool/api/trips/entities';

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

  async bookTrip(booking: BookingInput): Promise<Booking | null> {
    return this.prisma.booking.create({
      data: {
        userId: booking.userId,
        tripId: booking.tripId,
        bookingDate: booking.bookingDate,
        seatsBooked: booking.seatsBooked,
        status: booking.status,
        price: booking.price,
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
}
