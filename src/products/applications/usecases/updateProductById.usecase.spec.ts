import { faker } from "@faker-js/faker";
import { Builder } from "builder-pattern";
import { IProduct, Product } from "../domains/product";
import { mock } from "jest-mock-extended";
import { clone } from "radash";
import { ProductRepository } from "../ports/product.repository";
import { UpdateProductByIdUseCase } from "./updateProductById.usecase";
import { UpdateProductByIdCommand } from "./updateProductById.command";

describe('Update product by id use case', () => {

	it('should be pass id and update product to repository.' async () => {
		// Arrange
		const productId = faker.database.mongodbObjectId();
		const oldProduct = Builder(Product)
			.id(productId)
			.name(faker.commerce.productName())
			.detail(faker.commerce.productDescription())
			.price(faker.number.float(10000))
			.quantity(faker.number.int(10))
			.build();

		const productToUpdate = mock<IProduct>({
			quantity: 100,
		});

		const expectedUpdatedProduct = clone(oldProduct);
		expectedUpdatedProduct.quantity = productToUpdate.quantity;

		const productRepository = mock<ProductRepository>();
		productRepository.updateById.mockResolvedValue(expectedUpdatedProduct);

		const updateProductByIdUseCase = new UpdateProductByIdUseCase(productRepository);

		const command: UpdateProductByIdCommand = {
			id: productId,
			product: productToUpdate,
		};

		// Act
		const actual = await updateProductByIdUseCase.execute(command);

		// Assert
		expect(actual).toStrictEqual(expectedUpdatedProduct);
		expect(productRepository.updateById).toHaveBeenCalledWith(productId, productToUpdate);
	});
});