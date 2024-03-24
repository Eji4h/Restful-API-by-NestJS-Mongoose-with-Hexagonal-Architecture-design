import { Types } from 'mongoose';
import { IProduct } from '../../applications/domains/product';

export interface ProductEntity extends Omit<IProduct, 'id'> {
  _id?: Types.ObjectId;
}
