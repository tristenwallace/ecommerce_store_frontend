import type { OnInit } from '@angular/core';
import type { Product } from '../../models/product.model';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgIf, CurrencyPipe, NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterLink, CurrencyPipe, NgFor, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product; // Single product
  quantity: number = 1; // Default quantity
  quantities = [1, 2, 3, 4, 5]; // Quantity options

  constructor(
    readonly productService: ProductService,
    readonly cartService: CartService,
    readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productIdStr = this.route.snapshot.paramMap.get('id');
    const productId = productIdStr !== null ? +productIdStr : 0;
    if (!isNaN(productId) && productId !== 0) {
      this.productService.getProductById(productId).subscribe((product) => {
        if (product !== undefined) {
          this.product = product;
          this.quantity = 1; // Initialize with a default quantity of 1
        }
      });
    }
  }

  addToCart(product: Product): void {
    if (product !== undefined) {
      this.cartService.addToCart(product, this.quantity); // Use the component's `quantity` property
      alert(`Added ${this.quantity} ${product.name}(s) to your cart.`);
    }
  }
}
