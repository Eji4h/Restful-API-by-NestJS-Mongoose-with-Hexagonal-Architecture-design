import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { jwtExpiresIn, jwtSecret } from '../configs/jwt.config';
import { UserMongoRepository } from '../users/adapters/outbounds/user.mongo.repository';
import {
  UserSchema,
  usersCollectionName,
} from '../users/adapters/outbounds/user.schema';
import { userRepositoryToken } from '../users/applications/ports/user.repository';
import { AuthController } from './adapters/inbounds/auth.controller';
import { JwtStrategy } from './jwtStrategy';
import { LoginUseCase } from './usecases/login.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: usersCollectionName, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LoginUseCase,
    {
      provide: userRepositoryToken,
      useClass: UserMongoRepository,
    },
  ],
})
export class AuthModule {}
