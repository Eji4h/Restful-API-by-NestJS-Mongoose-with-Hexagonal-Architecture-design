import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Builder } from 'builder-pattern';
import { Model } from 'mongoose';

import { IUser, User } from '../../applications/domains/user.domain';
import { UserRepository } from '../../applications/ports/user.repository';
import { UserEntity } from './user.entity';
import { usersCollectionName } from './user.schema';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(usersCollectionName)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async create(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    const userCreated = await newUser.save();
    return UserMongoRepository.toDomain(userCreated);
  }
  async getByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    return UserMongoRepository.toDomain(user);
  }

  static toDomain(user: UserEntity): IUser {
    return Builder(User)
      .id(user._id.toString())
      .username(user.username)
      .email(user.email)
      .hashedPassword(user.hashedPassword)
      .createdAt(user.createdAt)
      .updateAt(user.updateAt)
      .build();
  }
}
