import { IProduct } from '../domains/product';

export interface UpdateProductByIdCommand {
  id: string;
  product: Partial<IProduct>;
}
