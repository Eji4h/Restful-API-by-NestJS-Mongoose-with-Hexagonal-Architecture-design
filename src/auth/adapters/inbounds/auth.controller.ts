import { Body, Controller, Post } from '@nestjs/common';

import { LoginUseCase } from '../../usecases/login.usecase';
import { LoginDto } from './login.dto';

@Controller()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.loginUseCase.execute(loginDto);
    return {
      accessToken,
    };
  }
}
