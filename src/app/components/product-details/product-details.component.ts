import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf, CurrencyPipe, NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterLink, CurrencyPipe, NgFor, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product; // Single product
  quantity: number = 1; // Default quantity
  quantities = [1, 2, 3, 4, 5]; // Quantity options

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = +(this.route.snapshot.paramMap.get('id') || 0);
    if (!isNaN(productId) && productId !== 0) {
      this.productService.getProductById(productId).subscribe((product) => {
        if (product) {
          this.product = product;
          this.quantity = 1; // Initialize with a default quantity of 1
        }
      });
    }
  }

  addToCart(product: Product) {
    if (product) {
      this.cartService.addToCart(product, this.quantity); // Use the component's `quantity` property
      alert(`Added ${this.quantity} ${product.name}(s) to your cart.`);
    }
  }
}
