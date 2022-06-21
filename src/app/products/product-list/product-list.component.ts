import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/ProductModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: ProductModel[];
  @Output() clickEmit = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
    console.log(`products list`, this.products);
  }

  onClickProduct(product: ProductModel): void {
    console.log('product: ', product);

    this.clickEmit.emit(product);
  }

}
