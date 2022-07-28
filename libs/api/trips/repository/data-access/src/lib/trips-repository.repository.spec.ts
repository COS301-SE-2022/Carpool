import { Test, TestingModule } from '@nestjs/testing';
import { TripsRepository } from './trips-repository.repository';
import { PrismaService } from '@carpool/api/prisma';
import {
  Booking,
  Trip,
  Location,
  TripsUpdate,
} from '@carpool/api/trips/entities';

jest.mock('@carpool/api/trips/entities');

const tripMock: jest.Mocked<Trip> = new Trip() as Trip;
const tripUpdateMock: jest.Mocked<TripsUpdate> =
  new TripsUpdate() as TripsUpdate;
const tripsMock: jest.Mocked<Trip[]> = new Array<Trip>();
const bookingMock: jest.Mocked<Booking> = new Booking() as Booking;
const locationMock: jest.Mocked<Location> = new Location() as Location;

describe('TripsRepository', () => {
  let repository: TripsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsRepository, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    repository = module.get<TripsRepository>(TripsRepository);
  });
  it('should be defined', () => {
    expect(prisma).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(repository, 'findAll')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await repository.findAll()).toEqual(
        expect.arrayContaining(result)
      );
    });
  });

  //findTripById
  describe('findTripById', () => {
    it('should a trip based on tripId', async () => {
      jest
        .spyOn(repository, 'findTripById')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await repository.findTripById('1')).toMatchObject(tripMock);
    });
  });

  //findCoordinatesByTrip
  describe('findCoordinatesByTrip', () => {
    const result = [locationMock];
    it('should return Coordinates', async () => {
      jest
        .spyOn(repository, 'findCoordinatesByTrip')
        .mockImplementation((): Promise<Location[]> => Promise.resolve(result));

      expect(await repository.findCoordinatesByTrip('1')).toMatchObject(result);
    });
  });

  //searchTrips
  describe('searchTrips', () => {
    const result = [tripMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(repository, 'searchTrips')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(result));

      expect(await repository.searchTrips('1')).toMatchObject(result);
    });
  });

  describe('findByDriver', () => {
    it('should return an array of trips', async () => {
      jest
        .spyOn(repository, 'findByDriver')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(tripsMock));

      expect(await repository.findByDriver('1')).toMatchObject(tripMock);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'findByDriver').mockResolvedValue(null);

      expect(await repository.findByDriver('1')).toEqual(null);
    });
  });

  describe('findByPassenger', () => {
    it('should return an array of trips', async () => {
      jest
        .spyOn(repository, 'findByPassenger')
        .mockImplementation((): Promise<Trip[]> => Promise.resolve(tripsMock));

      expect(await repository.findByPassenger('1')).toMatchObject(tripMock);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'findByDriver').mockResolvedValue(null);

      expect(await repository.findByDriver('1')).toEqual(null);
    });
  });

  //find booking by trip****************************
  describe('findBookingByTrip', () => {
    const result = [bookingMock];
    it('should return an array of trips', async () => {
      jest
        .spyOn(repository, 'findBookingByTrip')
        .mockImplementation((): Promise<Booking[]> => Promise.resolve(result));

      expect(await repository.findBookingByTrip('1')).toMatchObject(result);
    });
  });

  describe('create', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(
        await repository.create(
          'John',
          '01/01/2022',
          '3',
          'R85',
          'confirmed',
          'startLocationAddress',
          'startLocationLongitude',
          'startLocationLatitude',
          'destinationAddress',
          'destinationLongitude',
          'destinationLatitude'
        )
      ).toMatchObject(tripMock);
    });
  });

  //book trip*****************************************
  describe('bookTrip', () => {
    it('should be able to book a trip', async () => {
      jest
        .spyOn(repository, 'bookTrip')
        .mockImplementation(
          (): Promise<Booking> => Promise.resolve(bookingMock)
        );

      expect(
        await repository.bookTrip(
          'passengerId',
          'tripId',
          'seatsBooked',
          'status',
          'price',
          'address',
          'latitude',
          'longitude'
        )
      ).toMatchObject(bookingMock);
    });
  });

  describe('update', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(repository, 'update')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await repository.update('1', tripUpdateMock)).toMatchObject(
        tripMock
      );
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue(null);

      expect(await repository.update('1', tripUpdateMock)).toEqual(null);
    });
  });

  describe('delete', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await repository.delete('1')).toMatchObject(tripMock);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      expect(await repository.delete('1')).toEqual(null);
    });
  });
});
