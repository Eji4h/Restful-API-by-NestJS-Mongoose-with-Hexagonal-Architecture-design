import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserEntity } from './user.entity';

export const usersCollectionName = 'users';

@Schema({
  collection: usersCollectionName,
  timestamps: true,
})
export class UserMongoSchema implements UserEntity {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updateAt?: Date;
}
export const UserSchema = SchemaFactory.createForClass(UserMongoSchema);
UserSchema.index({ username: 1, email: 1 }, { unique: true });
