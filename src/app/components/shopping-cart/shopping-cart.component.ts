import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
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
    private fb: FormBuilder,
    public cartService: CartService,
    private router: Router,
    private orderService: OrderService
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

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateCart(item.product, quantity);
  }

  removeItem(item: Product) {
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

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const total = this.calculateTotal();
      const { name } = this.checkoutForm.value;

      // Set the order details
      this.orderService.setOrderDetails({
        name: name,
        total: total,
      });

      this.cartService.clearCart();

      // Navigate to the order confirmation page
      this.router.navigate(['/order-confirmation']);
    }
  }
}
