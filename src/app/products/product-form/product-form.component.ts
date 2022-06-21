import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertServiceInterface } from 'src/app/shared/Interfaces/alert';
import { ProductModel } from 'src/app/shared/models/ProductModel';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { messageFormInvalid, titleFormInavlid } from '../constant/product-message';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() set setProduct(productInput: ProductModel) {
    if(!!productInput) {
      this.product = productInput;
      this.form.patchValue(this.product);
      this.form.updateValueAndValidity();
    }
  };

  @Output() saveEmit = new EventEmitter<ProductModel>();
  @Output() deleteEmit = new EventEmitter<ProductModel>();

  form: FormGroup;
  product: ProductModel;

  constructor(
    private readonly formBuild: FormBuilder,
    private readonly alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuild.group({
      productId: [ undefined ],
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      description: [''] 
    });

    this.form.get('productId').disable();
  }

  onClickSave(): void {
    if (this.form.valid) {
      this.saveEmit.emit(this.form.value);
      this.form.reset();
    } else {
      this.alertService.show(messageFormInvalid, titleFormInavlid);
    }
  }

  onUpdate(): void {
    let objValue:ProductModel = {productId:this.product.productId,...this.form.value}
    if (this.form.valid) {
      this.saveEmit.emit(objValue);
      this.form.reset();
    } else {
      this.alertService.show(messageFormInvalid, titleFormInavlid);
    }
  }

  onDelete(): void {
    let objValue:ProductModel = {productId:this.product.productId, name:'', price:0, description:''}
    this.deleteEmit.emit(objValue);
    this.form.reset();
    
  }

  newProduct(): void {
    this.form.reset();
    this.product = undefined;
  }

}
