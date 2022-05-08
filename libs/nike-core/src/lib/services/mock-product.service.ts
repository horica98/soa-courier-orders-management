import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';

import { Product, ProductService } from '../models';

@Injectable()
export class MockProductService implements ProductService {

  getProducts(): Observable<Product[]> {
    const products: Product[] = [];
    for (let i = 0; i < 20; i ++) {
      products.push(this.generateProduct());
    }
    return of(products);
  }

  generateProduct(one = false): Product {
    return {
      // name: faker.company.companyName(),
      name: 'Nike Mercurial',
      price: faker.datatype.number({min: 200, max: 800}),
      quantity: faker.datatype.number({min: 1, max: 50}),
      photoUrl: one ? 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b984bad8-5b2a-4c14-8c19-ddb55c7cdec1/mercurial-vapor-14-academy-mg-multi-ground-football-boot-tPZz5n.png' : faker.image.food()
    } as Product;
  }

  getProductById(id: number): Observable<Product> {
    return of(this.generateProduct(true));
  }
}
