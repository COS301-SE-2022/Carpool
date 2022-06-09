import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User, UserUpdate } from '@carpool/api/authentication/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from '@carpool/api/authentication/service';

jest.mock('@carpool/api/authentication/entities');
const userMock: jest.Mocked<User> = new User() as User;
const userUpdateMock: jest.Mocked<UserUpdate> = new UserUpdate() as UserUpdate;

jest.mock('@nestjs-modules/mailer');

describe('AuthService', () => {
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  let service: AuthService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, QueryBus, CommandBus, MailerService],
    }).compile();

    await module.init();

    service = module.get<AuthService>(AuthService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
    mailerService = module.get<MailerService>(MailerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  /**
   * Test the findUserById method
   */
  describe('findUserById', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(service, 'findUserById')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await service.findUserById('1')).toBe(userMock);
    });
  });

  /**
   * Test the login method
   */
  describe('login', () => {
    it('should return a User object', async () => {
      jest
        .spyOn(service, 'login')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(await service.login('email@example.com', 'password')).toBe(
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
        .spyOn(service, 'register')
        .mockImplementation((): Promise<User> => Promise.resolve(userMock));

      expect(
        await service.register(
          'john',
          'doe',
          'email@example.com',
          'Tuks',
          '12345678',
          'password'
        )
      ).toBe(userMock);
    });
  });

  /**
   * Test the verifyEmail method
   */
  describe('verifyEmail', () => {
    it('should return a true', async () => {
      jest
        .spyOn(service, 'verifyEmail')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      expect(await service.verifyEmail('1')).toBe(true);
    });
  });

  /**
   * Test the sendVerificationEmail method
   */
  describe('sendVerificationEmail', () => {
    it('should return a true', async () => {
      jest
        .spyOn(service, 'sendVerificationEmail')
        .mockImplementation((): Promise<void> => Promise.resolve(void 0));

      expect(
        await service.sendVerificationEmail('email@example.com', '1234')
      ).toBe(void 0);
    });
  });

  /**
   * Test the updateUser method
   */
  describe('updateUser', () => {
    it('should return a UserUpdate object', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockImplementation(
          (): Promise<UserUpdate> => Promise.resolve(userUpdateMock)
        );

      expect(
        await service.updateUser(
          '1',
          'john',
          'doe',
          'email@example.com',
          'Tuks',
          '12345678'
        )
      ).toBe(userUpdateMock);
    });
  });
});
