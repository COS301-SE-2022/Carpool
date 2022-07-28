import { Module } from '@nestjs/common';
import { AuthService } from '@carpool/api/authentication/service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { TripsService } from '@carpool/api/trips/service';
import { TripsRepository } from '@carpool/api/trips/repository';
import { BookingResolver } from './bookings-resolver.resolver';
import { FindAllTripRequestsHandler } from '@carpool/api/trips/service';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthService,
    TripsService,
    TripsRepository,
    BookingResolver,
    PrismaService,
    FindAllTripRequestsHandler,
  ],
})
export class BookingsModule {}
