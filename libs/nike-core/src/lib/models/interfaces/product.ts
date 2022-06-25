export interface Product {
  id?: number;
  name: string;
  photoUrl: string;
  quantity: number;
  price: number;
}

export interface PackageProduct extends Product {
  size: number;
}
