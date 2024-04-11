import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private cartItems: Product[] = [];

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    this.cartItems = [...this.cartItems, product];
    this.cartSubject.next(this.cartItems);  // Emit the updated cart items
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cartItems);  // Emit the updated cart items
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);  // Emit the updated cart items
  }

  calculateTotal() {
    return this.cartItems.reduce((acc, product) => acc + product.price, 0);
  }

  getCartItemsValueForDebug(): Product[] {
    return this.cartSubject.getValue();
  }
}

