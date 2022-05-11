import { Module } from '@nestjs/common';
import { AuthRepository } from '@carpool/api/authentication/repository';
import {
  AuthService,
  UserVerifyHandler,
} from '@carpool/api/authentication/service';
import { AuthResolver } from './auth-resolver.resolver';
import {
  UserLoginHandler,
  UserRegisterHandler,
} from '@carpool/api/authentication/service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    UserLoginHandler,
    UserRegisterHandler,
    UserVerifyHandler,
    AuthRepository,
  ],
})
export class AuthenticationModule {}
