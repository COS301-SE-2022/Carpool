import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';
import { UserLoginQuery } from './queries/auth-query.query';
import { UserRegisterCommand } from './commands/auth-command.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    return await this.queryBus.execute(new UserLoginQuery(email, password));
  }

  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
    university: string,
    studentNumber: string
  ): Promise<User | null> {
    if (!this.checkEmailFormat(email)) {
      throw new Error('Not a valid student email address');
    }

    return await this.commandBus.execute(
      new UserRegisterCommand(
        name,
        surname,
        email,
        password,
        university,
        studentNumber
      )
    );
  }

  checkEmailFormat(email: string): boolean {
    const domain = email.split('@')[1];

    const validDomains = [
      'myuct.co.za',
      'sun.ac.za',
      'tuks.co.za',
      'students.wits.ac.za',
      'stu.ukzn.ac.za',
      'myuwc.ac.za',
      'campus.ru.ac.za',
      'student.uj.ac',
      'student.g.nwu.ac.za',
      'ufs4life.ac.za',
      'mandela.ac.za',
      'dut4life.ac.za',
      'unizulu.ac.za',
      'student.monash.edu',
      'edu.vut.ac.za',
      'stud.cut.ac.za',
      'mywsu.ac.za',
      'keyaka.ul.ac.za',
      'tut4life.ac.za',
    ];

    if (validDomains.includes(domain)) {
      return true;
    } else {
      return false;
    }
  }
}
