import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, ReactiveFormsModule],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Product[] = [];
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      creditCardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Example simple validation
      creditCardExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]], // MM/YY format
      creditCardCVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]] // Example 3-digit CVV
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log('Current cart items:', items);
    });
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form Data: ', this.checkoutForm.value);
      this.cartService.clearCart();

      // Navigate to the order confirmation page
      this.router.navigate(['/order-confirmation']);
    }
  }
}
