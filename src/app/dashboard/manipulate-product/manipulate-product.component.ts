import { MessageService } from './../../services/generic/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { ProductService } from 'src/app/services/bussiness/product.service';

@Component({
  selector: 'app-manipulate-product',
  templateUrl: './manipulate-product.component.html',
  styleUrls: ['./manipulate-product.component.scss'],
})
export class ManipulateProductComponent implements OnInit {

  public title = '';
  public button = '';

  public myProduct = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    amount: new FormControl(),
    price: new FormControl(),
    active: new FormControl(false)
  });

  constructor(private productService : ProductService,
    private router : Router,
    private activeRoute: ActivatedRoute,
    private messageService : MessageService) { }

  public manipulateProduct() : void {
    
    if(this.getCurrentRoute('dashboard/my-products/add-product')) {
            
      this.productService.addProduct(this.myProduct.getRawValue()).subscribe({
        next: data => {
          AlertDefault.commonAlert("Produto criado com sucesso!");
          this.messageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_PRODUCTS_LIST, data);
          this.router.navigateByUrl('dashboard/my-products');
        }
      })
    }

    if(this.getCurrentRoute('dashboard/my-products/edit-product')) {

      let id : number = this.myProduct.getRawValue().id;
      
      this.productService.updateProduct(this.myProduct.getRawValue(), id).subscribe({
        next: data => {
          AlertDefault.commonAlert("Produto editado com sucesso!");
          this.messageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_PRODUCTS_LIST, data);
          this.router.navigateByUrl('dashboard/my-products');
        }
      });
    }
  }

  private fillColumns(data) : void {

    this.myProduct.get('id').setValue(data.id);
    this.myProduct.get('name').setValue(data.name);
    this.myProduct.get('description').setValue(data.description);
    this.myProduct.get('type').setValue(data.type);
    this.myProduct.get('amount').setValue(data.amount);
    this.myProduct.get('price').setValue(data.price);
    this.myProduct.get('active').setValue(data.active);

  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  ngOnInit() {

  
    if(this.getCurrentRoute('dashboard/my-products/add-product')) {
      this.title = 'Adicionar produto';
      this.button = 'Cadastrar';
      return;
    }

    if(this.getCurrentRoute('dashboard/my-products/edit-product')) {
      
      this.title = 'Editar produto';
      this.button = 'Editar';

      this.activeRoute.queryParams.subscribe(queryParams => {

        this.fillColumns(queryParams);
  
      });

      return;
    }
  }
}
