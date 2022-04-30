import { Observable } from 'rxjs';

import { Order } from './order';

export interface OrderService {
  getAll(): Observable<{ orders: Order[] }>;
  getOrderById(orderId: number): Observable<{ order: Order | undefined }>;
  takeOrder(orderId: number, courierId: number): Observable<any>;
  getCourierOrders(courierId: number): Observable<Order[]>;
}
