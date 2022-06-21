import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel, ProductResponse } from '../../models/ProductModel';

@Injectable()
export class ProductService {

  private readonly url = 'http://localhost:8080/products';

  constructor(private readonly http: HttpClient) { }

  query(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url);
  }

  store(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductResponse>(this.url, product);
  }

  update(changes: Partial<ProductModel>): Observable<ProductModel> {
    return this.http.put<ProductResponse>(`${this.url}`, changes);
  }

  delete(id:bigint): Observable<ProductModel> {
    return this.http.delete<ProductResponse>(`${this.url}/${id}`);
  }

}
