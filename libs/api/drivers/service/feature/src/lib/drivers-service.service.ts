import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Driver } from '@carpool/api/authentication/entities';
import { FindDriverProfileQuery } from './queries/drivers-query.query';

@Injectable()
export class DriversService {
  constructor(private readonly queryBus: QueryBus) {}

  async findDriverProfile(userId: string): Promise<Driver | null> {
    return await this.queryBus.execute(new FindDriverProfileQuery(userId));
  }
}
