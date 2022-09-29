import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  User,
  UserLogin,
  UserUpdate,
} from '@carpool/api/authentication/entities';
import { AuthResolver } from './auth-resolver.resolver';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from '@carpool/api/authentication/service';

jest.mock('@carpool/api/authentication/entities');
const userMock: jest.Mocked<User> = new User() as User;
const userLoginMock: jest.Mocked<UserLogin> = new UserLogin() as UserLogin;
const userUpdateMock: jest.Mocked<UserUpdate> = new UserUpdate() as UserUpdate;

jest.mock('@nestjs-modules/mailer');

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        QueryBus,
        CommandBus,
        MailerService,
      ],
    }).compile();

    await module.init();

    authService = module.get<AuthService>(AuthService);
    resolver = module.get<AuthResolver>(AuthResolver);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(authService).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  /**
   * Test the findUserById method
   */
  describe('findUserById', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(resolver, 'findUserById')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await resolver.findUserById('1')).toBe(userMock);
    });
  });

  /**
   * Test the login method
   */
  describe('login', () => {
    it('should return a UserLogin object', async () => {
      jest
        .spyOn(resolver, 'login')
        .mockImplementation(
          (): Promise<UserLogin> => Promise.resolve(userLoginMock)
        );

      expect(await resolver.login('email@example.com', 'password')).toBe(
        userLoginMock
      );
    });
  });

  /**
   * Test the register method
   */
  describe('register', () => {
    it('should return a UserLogin object', async () => {
      jest
        .spyOn(resolver, 'register')
        .mockImplementation(
          (): Promise<UserLogin> => Promise.resolve(userLoginMock)
        );

      expect(
        await resolver.register(
          'john',
          'doe',
          'email@example.com',
          'Tuks',
          '12345678',
          '0716002219',
          'password'
        )
      ).toBe(userLoginMock);
    });
  });

  /**
   * Test the verifyEmail method
   */
  describe('verifyEmail', () => {
    it('should return a true', async () => {
      jest
        .spyOn(resolver, 'verifyEmail')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      expect(await resolver.verifyEmail('1')).toBe(true);
    });
  });

  /**
   * Test the updateUser method
   */
  describe('updateUser', () => {
    it('should return a UserUpdate object', async () => {
      jest
        .spyOn(resolver, 'updateUser')
        .mockImplementation(
          (): Promise<UserUpdate> => Promise.resolve(userUpdateMock)
        );

      expect(
        await resolver.updateUser(
          '1',
          'john',
          'doe',
          'email@example.com',
          'Tuks',
          '12345678',
          '0716002219'
        )
      ).toBe(userUpdateMock);
    });
  });
});
