import { IProduct } from '../domains/product';

const productsRepositoryTokenSymbol: unique symbol =
  Symbol('ProductsRepository');

export const productRepositoryToken = productsRepositoryTokenSymbol.toString();

export interface ProductRepository {
  create(product: IProduct): Promise<IProduct>;
}
