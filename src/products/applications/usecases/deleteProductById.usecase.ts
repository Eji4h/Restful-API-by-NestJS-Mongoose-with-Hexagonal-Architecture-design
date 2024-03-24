import { Inject, Injectable } from '@nestjs/common';

import {
  ProductRepository,
  productRepositoryToken,
} from '../ports/product.repository';
import { DeleteProductByIdCommand } from './deleteProductById.command';

@Injectable()
export class DeleteProductByIdUseCase {
  constructor(
    @Inject(productRepositoryToken)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: DeleteProductByIdCommand): Promise<void> {
    this.productRepository.deleteById(command.id);
  }
}
