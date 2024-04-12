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
export class OrderConfirmationComponent {
  customerName: string = '';
  orderTotal: number = 0;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getOrderDetails().subscribe((details) => {
      this.customerName = details.name;
      this.orderTotal = details.total;
    });
  }

  navigateToProductList() {
    this.router.navigateByUrl('/products');
  }
}
