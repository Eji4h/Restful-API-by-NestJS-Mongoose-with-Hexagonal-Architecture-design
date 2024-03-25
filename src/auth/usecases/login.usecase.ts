import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  UserRepository,
  userRepositoryToken,
} from '../../users/applications/ports/user.repository';
import { LoginCommand } from './login.command';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(userRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute({ username, password }: LoginCommand): Promise<string> {
    const user = await this.userRepository.getByUsername(username);
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    return this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });
  }
}
