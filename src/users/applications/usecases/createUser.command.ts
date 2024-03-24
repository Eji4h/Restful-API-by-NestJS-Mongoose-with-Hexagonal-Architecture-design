import { IUser } from '../domains/user.domain';

export interface CreateUserCommand
  extends Omit<
    IUser,
    'hashedPassword' | 'setHashPassword' | 'comparePassword'
  > {
  password: string;
}
