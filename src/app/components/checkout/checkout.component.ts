import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ CurrencyPipe, NgIf, ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {

  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, public cartService: CartService, private router: Router) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
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