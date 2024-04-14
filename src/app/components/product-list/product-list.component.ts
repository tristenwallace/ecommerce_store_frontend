import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, NgFor, RouterLink, NgIf, FormsModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  quantities = [1, 2, 3, 4, 5]; // Dropdown for quantity selection
  selectedQuantities: { [productId: number]: number } = {}; // To store quantities selected by the user

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      // Initialize the selectedQuantities object for each product
      this.products.forEach((product) => {
        this.selectedQuantities[product.id] = 1; // Default quantity set to 1
      });
    });
  }

  addToCart(product: Product) {
    const quantity = this.selectedQuantities[product.id];
    this.cartService.addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to your cart.`);
  }
}
