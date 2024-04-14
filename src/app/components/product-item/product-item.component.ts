import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe, NgFor, RouterLink, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Input() quantities: number[] = [1, 2, 3, 4, 5];
  selectedQuantity: number = 1;

  @Output() addToCartEvent = new EventEmitter<{
    product: Product;
    quantity: number;
  }>();

  addToCart(): void {
    this.addToCartEvent.emit({
      product: this.product,
      quantity: this.selectedQuantity,
    });
  }
}
