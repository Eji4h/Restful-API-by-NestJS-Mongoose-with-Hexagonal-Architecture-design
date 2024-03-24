import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateUserUseCase } from '../../applications/usecases/createUser.usecase';
import { GetUserByUsernameQuery } from '../../applications/usecases/getUserByUsername.query';
import { GetUserByUsernameUseCase } from '../../applications/usecases/getUserByUsername.usecase';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  getByUsername(@Query('username') username: string) {
    const query: GetUserByUsernameQuery = {
      username,
    };
    return this.getUserByUsernameUseCase.execute(query);
  }
}
