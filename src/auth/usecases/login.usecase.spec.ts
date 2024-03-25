import { faker } from '@faker-js/faker';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mock } from 'jest-mock-extended';

import { IUser } from '../../users/applications/domains/user.domain';
import { UserRepository } from '../../users/applications/ports/user.repository';
import { LoginCommand } from './login.command';
import { LoginUseCase } from './login.usecase';

describe('Login Use Case', () => {
  it('should be return jwt sign when user is exist and password correct.', async () => {
    // Arrange
    const userId = faker.database.mongodbObjectId();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    const user = mock<IUser>({
      id: userId,
      username,
    });
    user.comparePassword.mockReturnValue(true);
    const userRepository = mock<UserRepository>();
    userRepository.getByUsername.mockResolvedValue(user);

    const jwtService = mock<JwtService>();
    jwtService.sign.mockReturnValue(faker.string.alphanumeric());

    const loginUseCase = new LoginUseCase(userRepository, jwtService);

    const command: LoginCommand = {
      username,
      password,
    };

    const jwtSignCallExpected = {
      sub: userId,
      username,
    };

    // Act
    const actual = await loginUseCase.execute(command);

    // Assert
    expect(actual).not.toBeEmpty();
    expect(user.comparePassword).toHaveBeenCalledWith(password);
    expect(jwtService.sign).toHaveBeenCalledWith(jwtSignCallExpected);
  });

  it('should be return jwt sign when user is exist and password incorrect.', async () => {
    // Arrange
    const userId = faker.database.mongodbObjectId();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    const user = mock<IUser>({
      id: userId,
      username,
    });
    user.comparePassword.mockReturnValue(false);
    const userRepository = mock<UserRepository>();
    userRepository.getByUsername.mockResolvedValue(user);

    const jwtService = mock<JwtService>();

    const loginUseCase = new LoginUseCase(userRepository, jwtService);

    const command: LoginCommand = {
      username,
      password,
    };

    const jwtSignCallExpected = {
      sub: userId,
      username,
    };

    // Act
    const actPromise = loginUseCase.execute(command);

    // Assert
    await expect(actPromise).rejects.toThrow(
      new UnauthorizedException('Invalid username or password.'),
    );
    expect(user.comparePassword).toHaveBeenCalledWith(password);
    expect(jwtService.sign).not.toHaveBeenCalledWith(jwtSignCallExpected);
  });
});
