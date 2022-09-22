import { DriversRepository } from '@carpool/api/drivers/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDriverProfileQuery } from './drivers-query.query';
import { Driver } from '@prisma/client';

@QueryHandler(FindDriverProfileQuery)
export class FindDriverProfileHandler
  implements IQueryHandler<FindDriverProfileQuery>
{
  constructor(private readonly driversRepository: DriversRepository) {}

  async execute(query: FindDriverProfileQuery): Promise<Driver | null> {
    return await this.driversRepository.findDriverProfile(query.userId);
  }
}
