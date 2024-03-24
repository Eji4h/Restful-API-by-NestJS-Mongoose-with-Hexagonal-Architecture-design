import { Inject, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';

import { IUser, User } from '../domains/user.domain';
import { UserRepository, userRepositoryToken } from '../ports/user.repository';
import { CreateUserCommand } from './createUser.command';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(userRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserCommand): Promise<IUser> {
    const user = Builder(User).username(username).email(email).build();
    user.setHashPassword(password);
    return this.userRepository.create(user);
  }
}
