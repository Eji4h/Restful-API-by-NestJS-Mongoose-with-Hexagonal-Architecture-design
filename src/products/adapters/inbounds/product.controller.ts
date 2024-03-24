import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../applications/usecases/createProduct.usecase';
import { CreateProductDto } from './createProduct.dto';
import { CreateProductCommand } from '../../applications/usecases/createProduct.command';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const productCreateCommand: CreateProductCommand = createProductDto;
    return this.createProductUseCase.execute(productCreateCommand);
  }
}
