import { IUser } from '../domains/user.domain';

const userRepositoryTokenSymbol: unique symbol = Symbol('UserRepository');
export const userRepositoryToken = userRepositoryTokenSymbol.toString();

export interface UserRepository {
  create(user: IUser): Promise<IUser>;
  getByUsername(username: string): Promise<IUser>;
}
