import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Driver } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import * as bcrypt from 'bcrypt';
import {
  UserInput,
  UserUpdate,
  DriverInput,
  TopUniversities,
} from '@carpool/api/authentication/entities';
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

  async findTotalUsers(): Promise<number> {
    return this.prisma.user.count();
  }

  async findTopUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        avgRating: 'desc',
      },
      take: 5,
    });
  }

  async findTopUniversities(): Promise<TopUniversities[]> {
    const universities = await this.prisma.user.groupBy({
      by: ['university'],
      _count: {
        university: true,
      },
      orderBy: {
        _count: {
          university: 'desc',
        },
      },
    });

    return universities;
  }

  async findTotalDrivers(): Promise<number> {
    return this.prisma.driver.count();
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findRecentUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
  }

  async findAllDrivers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        isDriver: true,
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
          cellNumber: user.cellNumber,
          profilePic: '',
        },
      });
    }
  }

  async forgotPassword(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    } else {
      throw new Error(`User with email ${email} does not exist`);
    }
  }

  async resetPassword(email: string, password: string): Promise<User | null> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (user) {
      return user;
    } else {
      throw new Error(`User with email ${email} does not exist`);
    }
  }

  async registerDriver(driver: DriverInput): Promise<Driver | null> {
    const driverExist = await this.prisma.driver.findUnique({
      where: {
        userId: driver.userId,
      },
    });

    if (driverExist) {
      throw new Error(`User with already registered as driver`);
    } else {
      const driverCreated = await this.prisma.driver.create({
        data: {
          idNumber: driver.ID,
          licensePlate: driver.licensePlate,
          model: driver.carModel,
          userId: driver.userId,
          license: '',
          carPicture: '',
        },
      });

      await this.prisma.user.update({
        where: {
          id: driver.userId,
        },
        data: {
          isDriver: true,
        },
      });

      return driverCreated;
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
        cellNumber: user.cellNumber,
      },
    });

    if (updatedUser) {
      return updatedUser;
    }
  }
}
