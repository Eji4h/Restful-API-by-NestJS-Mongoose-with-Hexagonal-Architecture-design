import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { IProduct } from '../domains/product';
import { ProductRepository } from '../ports/product.repository';
import { GetProductByIdQuery } from './getProductById.query';
import { GetProductByIdUseCase } from './getProductById.usecase';

describe('Get product by id use case', () => {
  it('should be pass correct id to repository', async () => {
    // Arrange
    const productId = faker.database.mongodbObjectId();
    const product1 = mock<IProduct>({
      id: productId,
    });

    const productRepository = mock<ProductRepository>();
    productRepository.getById.mockResolvedValue(product1);

    const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    const query: GetProductByIdQuery = {
      id: productId,
    };

    const expected = product1;

    // Act
    const actual = await getProductByIdUseCase.execute(query);

    // Assert
    expect(actual).toEqual(expected);
  });
});
