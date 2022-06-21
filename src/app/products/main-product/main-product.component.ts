import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ProductModel } from 'src/app/shared/models/ProductModel';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { messageDeleteSuccess, messageSaveSuccess, messageUpdateSuccess, titleSaveSuccess } from '../constant/product-message';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.css']
})
export class MainProductComponent implements OnInit, OnDestroy {

  products: ProductModel[] = [];
  product: ProductModel;

  constructor(
    private readonly productService: ProductService,
    private readonly alertService: AlertService
    ) { }

  ngOnInit(): void {
    // created form
    // valid users
    // called initial services
    this.initialCalls();
  }

  initialCalls(): void {
    this.getProducts().subscribe();
  }

  getProducts(): Observable<ProductModel[]> {
    return this.productService.query().pipe(
      tap((products: ProductModel[]) => {
        console.log(products);
        this.products = products;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.alertService.showError(error);
        return throwError(error);
      })
    );
  }

  onSaveProduct(product: ProductModel): void {
    console.log(product)
    if (product.productId){
      this.getObservableUpdate(product).pipe(
        mergeMap(() => {
          return this.getProducts();
        })
      ).subscribe();
    } else {
      this.getObservableSave(product).pipe(
        mergeMap(() => {
          return this.getProducts();
        })
      ).subscribe();
    }
  }

  onDeleteProduct(product: ProductModel): void {
    console.log('dele')
    this.getObservableDelete(product.productId).pipe(
      mergeMap(() => {
        return this.getProducts();
      })
    ).subscribe();
  }

  getObservableSave(product: ProductModel): Observable<ProductModel> {
    return this.productService.store(product).pipe(
      tap(() => {
        this.alertService.show(messageSaveSuccess, titleSaveSuccess);
      }),
      catchError( (error: HttpErrorResponse) => {
        this.alertService.showError(error);
        return throwError(error);
      })
    );
  }

  getObservableUpdate(product: ProductModel): Observable<ProductModel> {
    return this.productService.update(product).pipe(
      tap(() => {
        this.alertService.show(messageUpdateSuccess, titleSaveSuccess);
      }),
      catchError( (error: HttpErrorResponse) => {
        this.alertService.showError(error);
        return throwError(error);
      })
    );
  }

  getObservableDelete(id: bigint): Observable<ProductModel> {
    return this.productService.delete(id).pipe(
      tap(() => {
        this.alertService.show(messageDeleteSuccess, titleSaveSuccess);
      }),
      catchError( (error: HttpErrorResponse) => {
        this.alertService.showError(error);
        return throwError(error);
      })
    );
  }

  onClickProduct(product: ProductModel): void {
    this.product = product;
  }

  ngOnDestroy(): void {
    // killed subcriptions
    // called services -
  }

}
