import { PromotionService } from './../../services/bussiness/promotion.service';
import { MessageService } from './../../services/generic/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/bussiness/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-manipulate-promotion',
  templateUrl: './manipulate-promotion.component.html',
  styleUrls: ['./manipulate-promotion.component.scss'],
})
export class ManipulatePromotionComponent implements OnInit {

  public title = '';
  public button = '';

  public product: Product[];


  public promotion = new FormGroup({
    id: new FormControl(0),
    percentage: new FormControl(''),
    initialDate: new FormControl(''),
    finalDate: new FormControl(''),
    description: new FormControl(''),
    title: new FormControl(''),
    products: new FormControl({multiSelect: [[0], Validators.required]})
  });

  public products : Product[] = [];

  constructor(private promotionService : PromotionService,
    private router : Router,
    private activeRoute: ActivatedRoute,
    private messageService : MessageService,
    private productService : ProductService) { }

  public manipulatePromotion() : void {
    
    if(this.getCurrentRoute('dashboard/promotions/add-promotion')) {  
      
      let initialDate = moment.
                        utc(this.promotion.get("initialDate").value).
                        format();
      
      let finalDate = moment.
      utc(this.promotion.get("finalDate").value).
      format();

      this.promotion.get("initialDate").setValue(initialDate);
      this.promotion.get("finalDate").setValue(finalDate);

      this.promotionService.addPromotion(this.promotion.getRawValue()).subscribe({
        next: data => {
          AlertDefault.commonAlert("Promoção criada com sucesso!");
          this.messageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_PROMOTION_LIST, data);
          this.router.navigateByUrl('dashboard/promotions');
        }
      })
    }

    if(this.getCurrentRoute('dashboard/promotions/edit-promotion')) {

      let id : number = this.promotion.getRawValue().id;

      let initialDate = moment.
                        utc(this.promotion.get("initialDate").value).
                        format();
      
      let finalDate = moment.
      utc(this.promotion.get("finalDate").value).
      format();

      this.promotion.get("initialDate").setValue(initialDate);
      this.promotion.get("finalDate").setValue(finalDate);

      this.promotionService.updatePromotion(this.promotion.getRawValue(), id).subscribe({
        next: data => {
          
          this.messageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_PROMOTION_LIST, data);
          this.router.navigateByUrl('dashboard/promotions');

        }
      });
    }
  }

  private fillColumns(data) : void {
    this.promotion.get('id').setValue(data.id);
    this.promotion.get('percentage').setValue(data.percentage);
    this.promotion.get('initialDate').setValue(data.initialDate);
    this.promotion.get('finalDate').setValue(data.finalDate);
    this.promotion.get('description').setValue(data.description);
    this.promotion.get('title').setValue(data.title);
    this.promotion.get('products').setValue(data.products);
  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  ngOnInit() {

    this.productService.getProduct(0, 1000).subscribe({
      next: data => {
        this.products = data.content;
        this.promotion.get('products').setValue(data.content);
      }
    });

    if(this.getCurrentRoute('dashboard/promotions/add-promotion')) {
      this.title = 'Adicionar promoção';
      this.button = 'Cadastrar';
      return;
    }

    if(this.getCurrentRoute('dashboard/promotions/edit-promotion')) {
      
      this.title = 'Editar promoção';
      this.button = 'Editar';

      this.activeRoute.queryParams.subscribe(queryParams => {

        this.fillColumns(queryParams);
  
      });

      return;
    }
  }
}
