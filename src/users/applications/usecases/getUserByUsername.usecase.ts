import { Inject, Injectable } from '@nestjs/common';

import { IUser } from '../domains/user.domain';
import { UserRepository, userRepositoryToken } from '../ports/user.repository';
import { GetUserByUsernameQuery } from './getUserByUsername.query';

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(
    @Inject(userRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  execute(query: GetUserByUsernameQuery): Promise<IUser> {
    return this.userRepository.getByUsername(query.username);
  }
}
