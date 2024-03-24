import { Inject, Injectable } from '@nestjs/common';
import {
  ProductRepository,
  productRepositoryToken,
} from '../ports/product.repository';
import { IProduct } from '../domains/product';
import { CreateProductCommand } from './createProduct.command';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(productRepositoryToken)
    private readonly productsRepository: ProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<IProduct> {
    return this.productsRepository.create(command);
  }
}
