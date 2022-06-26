import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart, Product, ProductService } from '../models';

const URL = 'http://127.0.0.1:5000';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(private http: HttpClient) {
  }

  searchByPhoto(formData: FormData): Observable<any> {
    return this.http.post(`${URL}/api/products/image-search/`, formData);
        // throw new Error('Method not implemented.');
    }

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${URL}/api/products`);
  }

  getProductById(id: number): Observable<{ product: Product }> {
    console.log('id', id)
    return this.http.get<{ product: Product }>(`${URL}/api/products/${id}`);
  }

  addProductToCart(product: Product, size: number): Observable<any> {
    return this.http.post<Product>('', {product, size});
  }

  searchByName(search: string): Observable<{ products: Product[] }> {
    return this.http.post<{ products: Product[] }>(`${URL}/api/products/text-search/`, {search});
  }
}
