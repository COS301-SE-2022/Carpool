import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip } from '@prisma/client';
import { Booking } from '@prisma/client';
import {
  BookingInput,
  TripsInput,
  TripsUpdate,
} from '@carpool/api/trips/api/shared';

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

  async create(trips: TripsInput): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        tripDate: trips.tripDate,
        seatsAvailable: trips.seatsAvailable,
        price: trips.price,
        startLocation: trips.startLocation,
        destination: trips.destination,
        category: trips.category,
        status: trips.status,
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
        status: trips.status,
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
