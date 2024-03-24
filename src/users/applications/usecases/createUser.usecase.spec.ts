import { faker } from '@faker-js/faker';
import { Builder, StrictBuilder } from 'builder-pattern';
import { mock } from 'jest-mock-extended';

import { User } from '../domains/user.domain';
import { UserRepository } from '../ports/user.repository';
import { CreateUserCommand } from './createUser.command';
import { CreateUserUseCase } from './createUser.usecase';

describe('Create User Use case', () => {
  it('should be create user.', async () => {
    // Arrange
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const email = faker.internet.email();
    const expected = Builder(User).username(username).email(email).build();

    const userRepository = mock<UserRepository>();
    userRepository.create.mockResolvedValue(expected);
    const setHashPasswordSpy = jest
      .spyOn(User.prototype, 'setHashPassword')
      .mockImplementation(() => {});

    const createUserUseCase = new CreateUserUseCase(userRepository);
    const command: CreateUserCommand = StrictBuilder<CreateUserCommand>()
      .username(username)
      .email(email)
      .password(password)
      .build();

    // Act
    const actual = await createUserUseCase.execute(command);

    // Assert
    expect(actual).toEqual(expected);
    expect(setHashPasswordSpy).toHaveBeenCalledWith(password);
    expect(userRepository.create).toHaveBeenCalledWith(expected);
  });
});
