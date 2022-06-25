import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart, Order, OrderService, PackageProduct } from '../models';
import { API_ULR } from '../utils';

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

  addToCart(product: PackageProduct, userId: number): Observable<any> {
    return this.http.post(`${API_ULR}/api/orders/cart/${userId}`, { product });
  }

  getCart(userId: number): Observable<any> {
    return this.http.get<{ cart: Cart }>(`${API_ULR}/api/orders/cart/${userId}`);
  }

  checkout(userId: number): Observable<any> {
    return this.http.get<any>(`${API_ULR}/api/orders/checkout/${userId}`);
  }

  getOrdersByUser(userId: number): Observable<any> {
    console.log(userId)
    return this.http.get<any>(`${API_ULR}/api/orders/${userId}`);
  }
}
