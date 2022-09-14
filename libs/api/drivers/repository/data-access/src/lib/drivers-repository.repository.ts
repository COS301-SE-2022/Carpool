import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carpool/api/prisma';
import { Driver } from '@prisma/client';

@Injectable()
export class DriversRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDriverProfile(userId: string): Promise<Driver> {
    return this.prisma.driver.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
