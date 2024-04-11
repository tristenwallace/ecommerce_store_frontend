import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  calculateTotal() {
    return this.cartItems.reduce((acc, product) => acc + product.price, 0);
  }
}