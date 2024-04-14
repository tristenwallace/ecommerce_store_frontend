import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Observable } from 'rxjs';

export interface OrderDetails {
  name: string;
  address: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly orderDetails = new BehaviorSubject<{ name: string; total: number }>({
    name: '',
    total: 0,
  });

  // set order details
  setOrderDetails(details: { name: string; total: number }): void {
    this.orderDetails.next(details);
  }

  // Get the current order details as Observable
  getOrderDetails(): Observable<{ name: string; total: number }> {
    return this.orderDetails.asObservable();
  }
}
