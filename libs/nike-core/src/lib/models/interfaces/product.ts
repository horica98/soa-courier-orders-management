export interface Product {
  name: string;
  photoUrl: string;
  quantity: number;
  price: number;
}

export interface PackageProduct extends Product {
  size: number;
}
