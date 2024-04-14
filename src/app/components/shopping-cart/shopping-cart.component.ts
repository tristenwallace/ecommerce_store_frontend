import type { OnInit } from '@angular/core';
import type { CartItem } from '../../services/cart.service';
import type { Product } from '../../models/product.model';
import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, ReactiveFormsModule, FormsModule],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  checkoutForm: FormGroup;

  constructor(
    readonly fb: FormBuilder,
    public cartService: CartService,
    readonly router: Router,
    readonly orderService: OrderService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      creditCardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ], // Example simple validation
      creditCardExpiration: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        ],
      ], // MM/YY format
      creditCardCVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // Example 3-digit CVV
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, quantity: string): void {
    const numericQuantity = Number(quantity); // Convert the string to a number
    this.cartService.updateCart(item.product, numericQuantity);
  }

  removeItem(item: Product): void {
    this.cartService.removeFromCart(item);
  }

  calculateTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  onSubmit = (): void => {
    if (this.checkoutForm.valid) {
      const total = this.calculateTotal();
      const { name } = this.checkoutForm.value;

      // Set the order details
      this.orderService.setOrderDetails({
        name,
        total,
      });

      this.cartService.clearCart();

      // Navigate to the order confirmation page
      this.router
        .navigate(['/order-confirmation'])
        .then(() => {
          console.log('Navigation succeeded!');
        })
        .catch((error) => {
          console.error('Navigation error:', error);
        });
    }
  };
}
