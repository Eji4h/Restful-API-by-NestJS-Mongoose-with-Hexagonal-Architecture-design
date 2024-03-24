import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../applications/ports/product.repository';
import { IProduct, Product } from '../../applications/domains/product';
import { InjectModel } from '@nestjs/mongoose';
import { productsCollectionName } from './product.mongo.schema';
import { Model } from 'mongoose';
import { ProductEntity } from './product.entity';
import { Builder } from 'builder-pattern';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  constructor(
    @InjectModel(productsCollectionName)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  async create(product: IProduct): Promise<IProduct> {
    const newProduct = new this.productModel(product);
    const productCreated = await newProduct.save();
    return ProductMongoRepository.toDomain(productCreated);
  }

  static toDomain(product: ProductEntity): IProduct {
    return Builder(Product)
      .id(product._id.toString())
      .name(product.name)
      .detail(product.detail)
      .price(product.price)
      .quantity(product.quantity)
      .createdAt(product.createdAt)
      .updatedAt(product.updatedAt)
      .build();
  }
}
