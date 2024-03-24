import { Inject, Injectable } from '@nestjs/common';

import { IProduct } from '../domains/product';
import {
  ProductRepository,
  productRepositoryToken,
} from '../ports/product.repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject(productRepositoryToken)
    private readonly productRepository: ProductRepository,
  ) {}

  execute(): Promise<IProduct[]> {
    return this.productRepository.getAll();
  }
}
