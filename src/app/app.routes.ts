import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

// Define your routes
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, title: 'Product List' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  { path: 'cart', component: ShoppingCartComponent, title: 'Shopping Cart' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    title: 'Description',
  },
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
    title: 'Order Confirmed',
  },
];
