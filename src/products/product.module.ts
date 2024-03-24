import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './adapters/inbounds/product.controller';
import { ProductMongoRepository } from './adapters/outbounds/product.mongo.repository';
import {
  ProductSchema,
  productsCollectionName,
} from './adapters/outbounds/product.mongo.schema';
import { productRepositoryToken } from './applications/ports/product.repository';
import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { GetAllProductsUseCase } from './applications/usecases/getAllProducts.usecase';
import { GetProductByIdUseCase } from './applications/usecases/getProductById.usecase';
import { UpdateProductByIdUseCase } from './applications/usecases/updateProductById.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productsCollectionName, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductByIdUseCase,
    {
      provide: productRepositoryToken,
      useClass: ProductMongoRepository,
    },
  ],
})
export class ProductModule {}
