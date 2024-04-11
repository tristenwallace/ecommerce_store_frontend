import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ NgIf, RouterLink, CurrencyPipe ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = +(this.route.snapshot.paramMap.get('id') || 0);
    if (!isNaN(productId)) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
      });
    }
  }
}
