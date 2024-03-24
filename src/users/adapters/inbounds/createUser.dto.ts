import { IsEmail } from 'class-validator';

import { IUser } from '../../applications/domains/user.domain';

export class CreateUserDto
  implements
    Omit<
      IUser,
      'id' | 'hashedPassword' | 'setHashPassword' | 'comparePassword'
    >
{
  username: string;

  @IsEmail()
  email: string;

  password: string;

  createdAt?: Date;
  updateAt?: Date;
}
