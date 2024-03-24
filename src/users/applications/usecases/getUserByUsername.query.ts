import { IUser } from '../domains/user.domain';

export type GetUserByUsernameQuery = Pick<IUser, 'username'>;
