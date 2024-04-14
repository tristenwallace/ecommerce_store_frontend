import type { OnInit } from '@angular/core';
import type { Product } from '../../models/product.model';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [NgFor, ProductItemComponent],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  quantities = [1, 2, 3, 4, 5]; // Dropdown for quantity selection

  constructor(
    readonly productService: ProductService,
    readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  handleAddToCart(event: { product: Product; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    alert(`Added ${event.quantity} ${event.product.name}(s) to your cart.`);
  }
}
