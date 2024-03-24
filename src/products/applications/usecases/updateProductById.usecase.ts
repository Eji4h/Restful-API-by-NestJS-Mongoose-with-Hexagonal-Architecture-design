import { Inject, Injectable } from '@nestjs/common';

import { IProduct } from '../domains/product';
import {
  ProductRepository,
  productRepositoryToken,
} from '../ports/product.repository';
import { UpdateProductByIdCommand } from './updateProductById.command';

@Injectable()
export class UpdateProductByIdUseCase {
  constructor(
    @Inject(productRepositoryToken)
    private readonly productRepository: ProductRepository,
  ) {}

  execute({ id, product }: UpdateProductByIdCommand): Promise<IProduct> {
    return this.productRepository.updateById(id, product);
  }
}
