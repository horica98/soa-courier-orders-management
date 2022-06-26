import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { DateTime } from 'luxon';

import { Cart, Order, OrderService, PackageProduct, Product } from '../models';

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

  generateCart(): Cart {
    const cart = {} as Cart;
    cart.estimatedDateTime = DateTime.now().plus({days: 2, hour: 4});
    cart.deliveryCost = 100;
    cart.deliveryAddress = 'Bulevardul Decebal nr 17, bloc C86/A ap. 19 etaj 7, 410197, Oradea, Bihor';
    cart.products = MockOrderService.generateProducts().map((prod: Product) => ({
      ...prod,
      size: faker.datatype.number({min: 40, max: 47})
    }));
    return cart;
  }

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

  addToCart(product: PackageProduct, userId: number): Observable<{ cart: Cart }> {
    return of({ cart: {} as Cart });
  }

  getCart(): Observable<any> {
    return of(this.generateCart());
  }

  checkout(serId: number): Observable<any> {
    return of(null);
  }

  getOrdersByUser(user: number): Observable<any> {
    return of(null);
  }
}
