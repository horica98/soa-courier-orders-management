import { Injectable } from '@angular/core';
import { Product, ProductService } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>('');
  }
}
