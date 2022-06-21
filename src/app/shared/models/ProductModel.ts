export interface ProductModel {
  productId: bigint;
  name: string;
  price: number;
  description: string;
}

export interface ProductResponse extends ProductModel {
  status: string;
}
