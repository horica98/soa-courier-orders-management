import { Observable } from 'rxjs';

import { Product } from '@nike-core';

export interface ProductService {
  getProducts(): Observable<{ products: Product[] }>;
  getProductById(id: number): Observable<{ product: Product }>;
  addProductToCart(product: Product, size: number): Observable<any>;
  searchByPhoto(formData: FormData): Observable<any>;
  searchByName(search: string): Observable<{ products: Product[] }>;
}
