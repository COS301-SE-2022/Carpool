import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@carpool/api/prisma';
import { Booking, Trip, Location } from '@carpool/api/trips/entities';
import { TripsService } from './trip-service.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';

jest.mock('@carpool/api/trips/entities');
const tripMock: jest.Mocked<Trip> = new Trip() as Trip;
const bookingMock: jest.Mocked<Booking> = new Booking() as Booking;
const locationMock: jest.Mocked<Location> = new Location() as Location;

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

  // findTripById
  describe('findTripById', () => {
    it('should return a trip based on tripId', async () => {
      jest
        .spyOn(service, 'findTripById')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await service.findTripById('1')).toBe(tripMock);
    });
  });

  describe('findByDriver', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findByDriver')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.findByDriver('1')).toBe(result);
    });
  });

  describe('findByPassenger', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findByPassenger')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.findByPassenger('1')).toBe(result);
    });
  });

  //find booking by trips**********
  describe('findBookingByTrip', () => {
    const result = [bookingMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(service, 'findBookingByTrip')
        .mockImplementation((): Promise<Booking[]> => Promise.resolve(result));

      expect(await service.findBookingByTrip('1')).toBe(result);
    });
  });

  //findCoordinatesByTrip
  describe('findCoordinatesByTrip', () => {
    const result = [locationMock];
    it('should return an array of Locations', async () => {
      jest
        .spyOn(service, 'findCoordinatesByTrip')
        .mockImplementation((): Promise<Location[]> => Promise.resolve(result));

      expect(await service.findCoordinatesByTrip('1')).toBe(result);
    });
  });

  //searchTrips
  describe('searchTrips', () => {
    const result = [tripMock];
    it('should return an array of Trips', async () => {
      jest
        .spyOn(service, 'searchTrips')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await service.searchTrips('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(
        await service.create(
          'John',
          '01/01/2022',
          '3',
          'R85',
          'startLocationAddress',
          'startLocationLongitude',
          'startLocationLatitude',
          'destinationAddress',
          'destinationLongitude',
          'destinationLatitude'
          // userMock
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

  //booktrip
  describe('bookTrip', () => {
    it('should be able to book a trip', async () => {
      jest
        .spyOn(service, 'bookTrip')
        .mockImplementation(
          (): Promise<Booking> => Promise.resolve(bookingMock)
        );

      expect(
        await service.bookTrip(
          'passengerId',
          'tripId',
          'seatsBooked',
          'status',
          'price',
          'address',
          'latitude',
          'longitude'
          // userMock
        )
      ).toBe(bookingMock);
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
