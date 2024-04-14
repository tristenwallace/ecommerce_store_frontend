import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Observable } from 'rxjs';
import type { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartItems: CartItem[] = [];

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem !== undefined) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.cartSubject.next(this.cartItems);
  }

  updateCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem !== undefined) {
      existingItem.quantity = quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    // Filter out the product to be removed
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== product.id
    );
    this.cartSubject.next(this.cartItems); // Emit the updated cart items
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }
}
