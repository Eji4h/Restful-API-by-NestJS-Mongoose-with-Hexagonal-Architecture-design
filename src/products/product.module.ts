import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductSchema,
  productsCollectionName,
} from './adapters/outbounds/product.mongo.schema';
import { ProductController } from './adapters/inbounds/product.controller';
import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { productRepositoryToken } from './applications/ports/product.repository';
import { ProductMongoRepository } from './adapters/outbounds/product.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productsCollectionName, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    {
      provide: productRepositoryToken,
      useClass: ProductMongoRepository,
    },
  ],
})
export class ProductModule {}
