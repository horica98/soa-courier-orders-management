import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { DateTime } from 'luxon';

import { Order, OrderService, Product } from '../models';

const ORDERS_COUNT = 5;
const PRODUCTS_COUNT = 4;

@Injectable()
export class MockOrderService implements OrderService {
  orders: Order[] = [];

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    for (let i = 0; i < ORDERS_COUNT; i++) {
      const order = {} as Order;
      order.id = i + 1;
      order.date = DateTime.now().minus({ minutes: faker.datatype.number({min: 1, max: 59}),
        hours: faker.datatype.number({ min: 0, max: 2 }) });
      order.products = MockOrderService.generateProducts();
      order.courierId = faker.datatype.number({min: 0, max: 1})
      order.value = order.products
        .map(product => product.quantity * product.price)
        .reduce((total, acc) => (total + acc), 0);
      this.orders.push(order);
    }
  }

  private static generateProducts():Product[] {
    const products = [];
    const maxCount = faker.datatype.number({min: 1, max: PRODUCTS_COUNT});
    for (let i = 0; i < maxCount; i++) {
      const product = {} as Product;
      product.name = `${faker.commerce.productName()} - ${faker.commerce.productAdjective()}`;
      product.photoUrl = `https://hosting.photobucket.com/images/i/FlaviuP/p_${faker.datatype.number({min: 1, max: 20})}.jpg`;
      product.price = faker.datatype.number({min: 1, max: 100});
      product.quantity = faker.datatype.number({min: 1, max: 5});
      products.push(product);
    }
    return products;
  };

  getAll(): Observable<{ orders: Order[] }> {
    return of({orders: this.orders});
  }

  getCourierOrders(courierId: number): Observable<Order[]> {
    return of([]);
  }

  getOrderById(orderId: number): Observable<{ order: Order | undefined }> {
    return of({order: this.orders.find(order => order.id === orderId)});
  }

  takeOrder(orderId: number, courierId: number): Observable<any> {
    return of(null);
  }
}
