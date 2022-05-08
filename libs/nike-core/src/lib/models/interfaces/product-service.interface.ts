import { Observable } from 'rxjs';

import { Product } from '@nike-core';

export interface ProductService {
  getProducts(): Observable<Product[]>;
  getProductById(id: number): Observable<Product>;
}
