import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { AuthService } from '@carpool/api/authentication/service';
import {
  DriversService,
  FindDriverProfileHandler,
} from '@carpool/api/drivers/service';
import { DriversRepository } from '@carpool/api/drivers/repository';
import { DriversResolver } from './drivers-resolver.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    //** RESOLVER */
    DriversResolver,
    //** REPOSITORY */
    DriversRepository,
    //** SERVICES */
    DriversService,
    PrismaService,
    AuthService,
    //** COMMAND HANDLERS */
    FindDriverProfileHandler,
  ],
})
export class DriversModule {}
