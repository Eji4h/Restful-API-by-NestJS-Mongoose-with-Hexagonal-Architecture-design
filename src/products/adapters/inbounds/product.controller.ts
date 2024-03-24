import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateProductCommand } from '../../applications/usecases/createProduct.command';
import { CreateProductUseCase } from '../../applications/usecases/createProduct.usecase';
import { GetAllProductsUseCase } from '../../applications/usecases/getAllProducts.usecase';
import { GetProductByIdQuery } from '../../applications/usecases/getProductById.query';
import { GetProductByIdUseCase } from '../../applications/usecases/getProductById.usecase';
import { CreateProductDto } from './createProduct.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const productCreateCommand: CreateProductCommand = createProductDto;
    return this.createProductUseCase.execute(productCreateCommand);
  }

  @Get()
  getAll() {
    return this.getAllProductsUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const query: GetProductByIdQuery = {
      id,
    };
    return this.getProductByIdUseCase.execute(query);
  }
}
