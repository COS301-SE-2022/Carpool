import { Module } from '@nestjs/common';
import { AuthRepository } from '@carpool/api/authentication/repository';
import {
  AuthService,
  FindUserByIdHandler,
  UserVerifyHandler,
} from '@carpool/api/authentication/service';
import { AuthResolver } from './auth-resolver.resolver';
import {
  UserLoginHandler,
  UserRegisterHandler,
  UserUpdateHandler,
  DriverRegisterHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  FindTotalDriversHandler,
  FindTotalUsersHandler,
  FindRecentUsersHandler,
  FindTopUniversitiesHandler,
  FindAllUsersHandler,
  AdminLoginHandler,
  FindTopUsersHandler,
} from '@carpool/api/authentication/service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { DriversService } from '@carpool/api/drivers/service';
import { TripsService } from '@carpool/api/trips/service';
@Module({
  imports: [CqrsModule],
  providers: [
    AuthResolver,
    AuthService,
    DriversService,
    DriverRegisterHandler,
    AdminLoginHandler,
    TripsService,
    FindTopUsersHandler,
    FindAllUsersHandler,
    FindTotalDriversHandler,
    FindTotalUsersHandler,
    FindTopUniversitiesHandler,
    FindRecentUsersHandler,
    ResetPasswordHandler,
    ForgotPasswordHandler,
    PrismaService,
    UserLoginHandler,
    UserUpdateHandler,
    UserRegisterHandler,
    UserVerifyHandler,
    AuthRepository,
    FindUserByIdHandler,
  ],
})
export class AuthenticationModule {}
