export interface IProduct {
  id?: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Product implements IProduct {
  id?: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;

  createdAt?: Date;
  updatedAt?: Date;
}
