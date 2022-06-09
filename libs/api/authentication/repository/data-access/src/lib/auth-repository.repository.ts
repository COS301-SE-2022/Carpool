import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import * as bcrypt from 'bcrypt';
import { UserInput, UserUpdate } from '@carpool/api/authentication/entities';
@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.isValidated) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      // const isValidPassword = user.password === password;

      if (isValidPassword) {
        return user;
      }
    } else if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    } else if (!user.isValidated) {
      throw new UnauthorizedException(`Email address has not been validated`);
    }
  }

  async register(user: UserInput): Promise<User | null> {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExist) {
      throw new Error(`User with email ${user.email} already exists`);
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);

      return this.prisma.user.create({
        data: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          university: user.university,
          studentNumber: user.studentNumber,
          password: hashedPassword,
          profilePic: '',
        },
      });
    }
  }

  async validateEmail(id: string): Promise<boolean> {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isValidated: true,
      },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async updateUser(user: UserUpdate): Promise<UserUpdate | null> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        university: user.university,
        studentNumber: user.studentNumber,
      },
    });

    if (updatedUser) {
      return updatedUser;
    }
  }
}
