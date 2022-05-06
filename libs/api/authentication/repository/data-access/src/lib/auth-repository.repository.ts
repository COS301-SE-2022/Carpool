import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import bcrypt from 'bcryptjs';
import { UserInput } from '@carpool/api/authentication/entities';
@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.isValidated) {
      // const isValidPassword = bcrypt.compareSync(password, user.password);
      const isValidPassword = user.password === password;

      if (isValidPassword) {
        return user;
      }
    } else if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    } else {
      throw new UnauthorizedException(
        `The email address ${email} has not been validated`
      );
    }
  }

  async register(user: UserInput): Promise<User | null> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    return this.prisma.user.create({
      data: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: hashedPassword,
        university: user.university,
        studentNumber: user.studentNumber,
      },
    });
  }

  async validateAccount();
}
