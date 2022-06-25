import { Observable } from 'rxjs';

import { Order } from './order';
import { PackageProduct } from './product';
import { Cart } from './cart';

export interface OrderService {
  getAll(): Observable<{ orders: Order[] }>;
  getOrderById(orderId: number): Observable<{ order: Order | undefined }>;
  takeOrder(orderId: number, courierId: number): Observable<any>;
  getCourierOrders(courierId: number): Observable<Order[]>;

  addToCart(product: PackageProduct, userId: number): Observable<any>;
  getCart(userId: number): Observable<{ cart: Cart }>;
  checkout(serId: number): Observable<any>;
  getOrdersByUser(user: number): Observable<any>;
}
