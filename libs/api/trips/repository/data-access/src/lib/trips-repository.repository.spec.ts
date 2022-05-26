import { Test, TestingModule } from '@nestjs/testing';
import { TripsRepository } from './trips-repository.repository';
import { PrismaService } from '@carpool/api/prisma';
import { Booking, Trip } from '@carpool/api/trips/entities';

jest.mock('@carpool/api/trips/api/shared');

const tripMock: jest.Mocked<Trip> = new Trip() as Trip;
const tripsMock: jest.Mocked<Trip[]> = new Array<Trip>();
const bookingMock: jest.Mocked<Booking> = new Booking() as Booking;

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

  describe('create', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await repository.create(tripMock)).toMatchObject(tripMock);
    });
  });

  //book trip*****************************************

  describe('update', () => {
    it('should return a trip', async () => {
      jest
        .spyOn(repository, 'update')
        .mockImplementation((): Promise<Trip> => Promise.resolve(tripMock));

      expect(await repository.update('1', tripMock)).toMatchObject(tripMock);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue(null);

      expect(await repository.update('1', tripMock)).toEqual(null);
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
