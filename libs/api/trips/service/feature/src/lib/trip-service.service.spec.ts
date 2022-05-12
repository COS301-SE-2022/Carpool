import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@carpool/api/prisma';
import { Booking, Trip } from '@carpool/api/trips/api/shared';
import { TripsService } from '@carpool/api/trips/service/feature';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';

jest.mock('@carpool/api/trips/api/shared');
const tripMock: jest.Mocked<Trip> = new Trip() as Trip;

jest.mock('@carpool/api/authentication/entities');
const userMock: jest.Mocked<User> = new User() as User;

const datetime = new Date();

describe('TripsService', () => {
  let service: TripsService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService, QueryBus, CommandBus],
    }).compile();

    await module.init();

    service = module.get<TripsService>(TripsService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  describe('findAll', () => {
    const result = [tripMock];

    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findByDriver', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findByDriver')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.findByPassenger('1')).toBe(tripMock);
    });
  });

  describe('findByPassenger', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findByPassenger')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.findByPassenger('1')).toBe(tripMock);
    });
  });
  //find booking by trips**********

  //book trip**********************

  describe('create', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(
        await service.create(
          datetime,
          3,
          10.0,
          'start',
          'end',
          'cat',
          'upcoming',
          userMock
        )
      ).toBe(tripMock);
    });
  });
  describe('delete', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await service.delete('1')).toBe(tripMock);
    });
  });

  describe('update', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await service.update('1', 3, 10.0, 'upcoming')).toBe(tripMock);
    });
  });
});
