import { IProduct } from '../domains/product';

const productsRepositoryTokenSymbol: unique symbol =
  Symbol('ProductsRepository');

export const productRepositoryToken = productsRepositoryTokenSymbol.toString();

export interface ProductRepository {
  create(product: IProduct): Promise<IProduct>;
  getAll(): Promise<IProduct[]>;
  getById(id: string): Promise<IProduct>;
  updateById(id: string, product: Partial<IProduct>): Promise<IProduct>;
}
