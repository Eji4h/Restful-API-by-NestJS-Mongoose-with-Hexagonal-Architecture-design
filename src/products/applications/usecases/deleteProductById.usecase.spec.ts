import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { ProductRepository } from '../ports/product.repository';
import { DeleteProductByIdCommand } from './deleteProductById.command';
import { DeleteProductByIdUseCase } from './deleteProductById.usecase';

describe('Delete product by id use case.', () => {
  it('should be pass correct id to repository.', async () => {
    // Arrange
    const productId = faker.database.mongodbObjectId();
    const productRepository = mock<ProductRepository>();

    const deleteProductByIdUseCase = new DeleteProductByIdUseCase(
      productRepository,
    );
    const command: DeleteProductByIdCommand = {
      id: productId,
    };

    // Act
    await deleteProductByIdUseCase.execute(command);

    // Assert
    expect(productRepository.deleteById).toHaveBeenCalledWith(productId);
  });
});
