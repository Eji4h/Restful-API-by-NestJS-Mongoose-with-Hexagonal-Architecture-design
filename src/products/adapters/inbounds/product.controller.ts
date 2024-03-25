import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/jwtAuth.guard';
import { CreateProductCommand } from '../../applications/usecases/createProduct.command';
import { CreateProductUseCase } from '../../applications/usecases/createProduct.usecase';
import { DeleteProductByIdCommand } from '../../applications/usecases/deleteProductById.command';
import { DeleteProductByIdUseCase } from '../../applications/usecases/deleteProductById.usecase';
import { GetAllProductsUseCase } from '../../applications/usecases/getAllProducts.usecase';
import { GetProductByIdQuery } from '../../applications/usecases/getProductById.query';
import { GetProductByIdUseCase } from '../../applications/usecases/getProductById.usecase';
import { UpdateProductByIdCommand } from '../../applications/usecases/updateProductById.command';
import { UpdateProductByIdUseCase } from '../../applications/usecases/updateProductById.usecase';
import { CreateProductDto } from './createProduct.dto';
import { UpdateProductByIdDto } from './updateProductById.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductByIdUseCase: UpdateProductByIdUseCase,
    private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const productCreateCommand: CreateProductCommand = createProductDto;
    return this.createProductUseCase.execute(productCreateCommand);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.getAllProductsUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    const query: GetProductByIdQuery = {
      id,
    };
    return this.getProductByIdUseCase.execute(query);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  putById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductByIdDto,
  ) {
    const command: UpdateProductByIdCommand = {
      id,
      product: updateProductDto,
    };
    return this.updateProductByIdUseCase.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductByIdDto,
  ) {
    const command: UpdateProductByIdCommand = {
      id,
      product: updateProductDto,
    };
    return this.updateProductByIdUseCase.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    const command: DeleteProductByIdCommand = {
      id,
    };
    return this.deleteProductByIdUseCase.execute(command);
  }
}
