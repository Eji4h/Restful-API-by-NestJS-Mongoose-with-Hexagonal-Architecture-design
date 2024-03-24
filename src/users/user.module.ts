import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './adapters/inbounds/user.controller';
import { UserMongoRepository } from './adapters/outbounds/user.mongo.repository';
import {
  UserSchema,
  usersCollectionName,
} from './adapters/outbounds/user.schema';
import { userRepositoryToken } from './applications/ports/user.repository';
import { CreateUserUseCase } from './applications/usecases/createUser.usecase';
import { GetUserByUsernameUseCase } from './applications/usecases/getUserByUsername.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: usersCollectionName, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserByUsernameUseCase,
    {
      provide: userRepositoryToken,
      useClass: UserMongoRepository,
    },
  ],
})
export class UserModule {}
