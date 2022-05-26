import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { Trip, Booking } from '@carpool/api/trips/entities';
import { User } from '@carpool/api/authentication/entities';
import { TripsResolver } from './trips-resolver.resolver';
import { TripsService } from '@carpool/api/trips/service';

jest.mock('@carpool/api/trips/api/shared');
const tripMock: jest.Mocked<Trip> = new Trip() as Trip;
const usersMock: jest.Mocked<Booking[]> = new Array<Booking>();

describe('ShortsReportsResolver', () => {
  let resolver: TripsResolver;
  let service: TripsService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsResolver, TripsService, QueryBus, CommandBus],
    }).compile();

    await module.init();

    resolver = module.get<TripsResolver>(TripsResolver);
    service = module.get<TripsService>(TripsService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });
  describe('passengers', () => {
    it('should return passengers of a trip', async () => {
      jest
        .spyOn(resolver, 'passengers')
        .mockImplementation(
          (): Promise<Booking[]> => Promise.resolve(usersMock)
        );

      expect(await resolver.passengers(tripMock)).toMatchObject(usersMock);
    });
  });

  describe('findAll', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(resolver, 'findAll')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await resolver.findAll()).toBe(result);
    });
  });

  describe('findByDriver', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(resolver, 'findByDriver')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await resolver.findByDriver('1')).toBe(result);
    });
  });

  describe('findByPassenger', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(resolver, 'findByPassenger')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await resolver.findByPassenger('1')).toBe(result);
    });
  });
  //create************************

  describe('delete', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(resolver, 'delete')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await resolver.delete('1')).toBe(tripMock);
    });
  });

  //update*************************

  //book trip**********************
});
