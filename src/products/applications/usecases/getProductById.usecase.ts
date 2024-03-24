import { Inject, Injectable } from '@nestjs/common';

import { IProduct } from '../domains/product';
import {
  ProductRepository,
  productRepositoryToken,
} from '../ports/product.repository';
import { GetProductByIdQuery } from './getProductById.query';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(productRepositoryToken)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(query: GetProductByIdQuery): Promise<IProduct> {
    return this.productRepository.getById(query.id);
  }
}
