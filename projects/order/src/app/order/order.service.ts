import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ULR, Order, OrderService } from '../shared';

@Injectable()
export class OrderServiceImpl implements OrderService{

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<{ orders: Order[] }> {
    return this.http.get<{ orders: Order[] }>(`${API_ULR}/api/orders`);
  }

  getCourierOrders(courierId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_ULR}/api/order/courier/${courierId}`);
  }

  getOrderById(orderId: number): Observable<{ order: Order | undefined }> {
    return this.http.get<{ order: Order | undefined }>(`${API_ULR}/api/orders/${orderId}`);
  }

  takeOrder(orderId: number, courierId: number): Observable<any> {
    return this.http.post(`${API_ULR}/api/assignments`, { order_id: orderId, courier_id: courierId });
  }
}
