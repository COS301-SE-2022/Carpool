import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { Trip, Booking, Location } from '@carpool/api/trips/entities';
import { User } from '@carpool/api/authentication/entities';
import { TripsResolver } from './trips-resolver.resolver';
import { TripsService } from '@carpool/api/trips/service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@carpool/api/authentication/service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

jest.mock('@carpool/api/trips/entities');
const tripMock: jest.Mocked<Trip> = new Trip() as Trip;
const usersMock: jest.Mocked<Booking[]> = new Array<Booking>();
const coordinatesMock: jest.Mocked<Location> = new Location() as Location;

jest.mock('@carpool/api/authentication/entities');
const userMock: jest.Mocked<User> = new User() as User;
jest.mock('@nestjs-modules/mailer');

describe('TripsResolver', () => {
  let resolver: TripsResolver;
  let service: TripsService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  let authService: AuthService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsResolver,
        AuthService,
        TripsService,
        QueryBus,
        CommandBus,
        MailerService,
      ],
    }).compile();

    await module.init();

    authService = module.get<AuthService>(AuthService);
    resolver = module.get<TripsResolver>(TripsResolver);
    service = module.get<TripsService>(TripsService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
    mailerService = module.get<MailerService>(MailerService);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(authService).toBeDefined();
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  /**
   * Test the coordinates field resolver method
   */
  describe('coordinates', () => {
    const result = [coordinatesMock];
    it('should return the coordinates of a trip', async () => {
      jest
        .spyOn(resolver, 'coordinates')
        .mockImplementation((): Promise<Location[]> => Promise.resolve(result));

      expect(await resolver.coordinates(tripMock)).toMatchObject(result);
    });
  });

  /**
   * Test the passengers field resolver method
   */
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

  /**
   * Test the driver field resolver method
   */
  describe('driver', () => {
    it('should return the driver of a trip', async () => {
      jest
        .spyOn(resolver, 'driver')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await resolver.driver(tripMock)).toMatchObject(userMock);
    });
  });

  /**
   * Test the findAllTrips method
   */
  describe('findAll', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(resolver, 'findAllTrips')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await resolver.findAllTrips()).toBe(result);
    });
  });

  /**
   * Test the findTripById method
   */
  describe('findTripById', () => {
    it('should return an array of trips', async () => {
      jest
        .spyOn(resolver, 'findTripById')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await resolver.findTripById('1')).toBe(tripMock);
    });
  });

  /**
   * Test the findByDriver method
   */
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
});
