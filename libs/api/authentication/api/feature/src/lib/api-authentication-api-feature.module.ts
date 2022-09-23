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
} from '@carpool/api/authentication/service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthResolver,
    AuthService,
    DriverRegisterHandler,
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
