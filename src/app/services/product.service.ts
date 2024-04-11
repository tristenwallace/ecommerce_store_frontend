import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/data.json');
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id)),
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return of(undefined);
      })
    );
  }
}
