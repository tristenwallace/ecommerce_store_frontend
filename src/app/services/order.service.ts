import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface OrderDetails {
  name: string;
  address: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderDetails = new BehaviorSubject<{ name: string; total: number }>({
    name: '',
    total: 0,
  });

  // set order details
  setOrderDetails(details: { name: string; total: number }) {
    this.orderDetails.next(details);
  }

  // Get the current order details as Observable
  getOrderDetails(): Observable<{ name: string; total: number }> {
    return this.orderDetails.asObservable();
  }
}
