import { faker } from '@faker-js/faker';
import exp from 'constants';
import { mock } from 'jest-mock-extended';

import { IUser } from '../domains/user.domain';
import { UserRepository } from '../ports/user.repository';
import { GetUserByUsernameQuery } from './getUserByUsername.query';
import { GetUserByUsernameUseCase } from './getUserByUsername.usecase';

describe('Get User By Username Use Case', () => {
  it('should be get user by username when user is exist.', async () => {
    // Arrange
    const username = faker.internet.userName();
    const user = mock<IUser>({
      username,
    });

    const userRepository = mock<UserRepository>();
    userRepository.getByUsername.mockResolvedValue(user);

    const getUserByUsernameUseCase = new GetUserByUsernameUseCase(
      userRepository,
    );

    const query: GetUserByUsernameQuery = {
      username,
    };

    const expected = user;

    // Act
    const actual = await getUserByUsernameUseCase.execute(query);

    // Assert
    expect(actual).toEqual(expected);
    expect(userRepository.getByUsername).toHaveBeenCalledWith(username);
  });
});
