import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  User,
  UserUpdate,
  UserInput,
} from '@carpool/api/authentication/entities';
import { AuthRepository } from './auth-repository.repository';
import { PrismaService } from '@carpool/api/prisma';

jest.mock('@carpool/api/authentication/entities');
const userMock: jest.Mocked<User> = new User() as User;
const userUpdateMock: jest.Mocked<UserUpdate> = new UserUpdate() as UserUpdate;
const userInputMock: jest.Mocked<UserInput> = new UserInput() as UserInput;

jest.mock('@nestjs-modules/mailer');

describe('AuthRepository', () => {
  let repository: AuthRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository, QueryBus, CommandBus, PrismaService],
    }).compile();

    await module.init();

    repository = module.get<AuthRepository>(AuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  /**
   * Test the findUserById method
   */
  describe('findUserById', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(repository, 'findUserById')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await repository.findUserById('1')).toBe(userMock);
    });
  });

  /**
   * Test the login method
   */
  describe('login', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(repository, 'login')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await repository.login('email@example.com', 'password')).toBe(
        userMock
      );
    });
  });

  /**
   * Test the register method
   */
  describe('register', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(repository, 'register')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await repository.register(userInputMock)).toBe(userMock);
    });
  });

  /**
   * Test the validateEmail method
   */
  describe('validateEmail', () => {
    it('should return a true', async () => {
      jest
        .spyOn(repository, 'validateEmail')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      expect(await repository.validateEmail('1')).toBe(true);
    });
  });

  /**
   * Test the updateUser method
   */
  describe('updateUser', () => {
    it('should return a UserUpdate object', async () => {
      jest
        .spyOn(repository, 'updateUser')
        .mockImplementation(
          (): Promise<UserUpdate> => Promise.resolve(userUpdateMock)
        );

      expect(await repository.updateUser(userUpdateMock)).toBe(userUpdateMock);
    });
  });
});
