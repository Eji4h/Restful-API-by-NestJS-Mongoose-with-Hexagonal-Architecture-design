import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductEntity } from './product.entity';

export const productsCollectionName = 'products';

@Schema({
  collection: productsCollectionName,
  timestamps: true,
})
export class ProductMongoSchema implements ProductEntity {
  @Prop()
  name: string;

  @Prop()
  detail: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductMongoSchema);
ProductSchema.index({ name: 1 }, { unique: true });
