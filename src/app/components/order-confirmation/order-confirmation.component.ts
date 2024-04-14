import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  customerName: string = '';
  orderTotal: number = 0;

  constructor(
    readonly router: Router,
    readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe((details) => {
      this.customerName = details.name;
      this.orderTotal = details.total;
    });
  }

  navigateToProductList(): void {
    this.router.navigateByUrl('/products');
  }
}
