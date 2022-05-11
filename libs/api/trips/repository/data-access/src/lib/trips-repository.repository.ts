import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Trip } from '@prisma/client';

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

  // async create(trips: TripsInput): Promise<Trips> {}

  // async bookTrip(tripId: string, passengerId: string) : Promise<Trip | null>

  // async update(id: string, trips: TripsUpdate): Promise<Trips> {}

  // async delete(id: string): Promise<Trips> {}
}
