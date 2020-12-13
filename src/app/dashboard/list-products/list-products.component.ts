import { OrderService } from './../../services/bussiness/order.service';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Pageable } from 'src/app/models/pageable.model';
import { ProductService } from 'src/app/services/bussiness/product.service';
import { ProductOrder } from 'src/app/models/product-order.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit, AfterViewInit {

  public products : ProductOrder[];
  private offsetPagination : number = 0;
  private pagination : Pageable;
  private types = {
    DELIVERY: "Delivery",
    WITHDRAWAL_ON_STORE: "Somente no estabelecimento",
    DELIVERY_AND_WITHDRAWAL: "Estabelecimento e delivery"
  };
  private pickType = {
    DELIVERY: "DELIVER",
    WITHDRAWAL_ON_STORE:"RETRIEVE"
  }

  private paymentType = "";

  public bag = [];

  private orderRequest : any = {};

  private definedType = '';
  private establishmentId = 0;

  public total = 0;

  constructor(private productService : ProductService, 
    private orderService : OrderService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }
  
  ngAfterViewInit(): void {
    this.total = 0;
    this.bag = [];
  }

  ngOnInit() {
    
    if(this.router.url.includes('/dashboard/list-products')) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.establishmentId = queryParams.id;
        this.definedType = queryParams.type;
        this.getClientProduct();
      });
    }
  }



  public getClientProduct() : void {
    this.productService.getClientProduct(0, this.definedType, this.establishmentId).subscribe({
      next: data => {
        
        this.products = data.content;

        if(this.products.length == 0) {
          AlertDefault.commonAlert("Não há produtos disponíveis para essa modalidade.");
          this.router.navigateByUrl('dashboard/establishment');
          return;
        }


        this.products = this.products.filter((product) => {
          product.quantity = 1;
          product.selected = false;
          return product;
        });

        this.pagination = new Pageable();
        
        this.pagination.totalElements = data.totalElements;
        this.pagination.totalPages = data.totalPages;
        

      }
    });
  }

  public addQuantity(product) : void {


    if(product.quantity > product.amount) {
      AlertDefault.commonAlert("Não há mais deste produto além da quantidade fornecida.");
      return;
    }

    product.quantity++;
    
    if(product.selected) {
      this.total = this.total + (product.price * (1 - ((product.promotionPercentage) / 1000)));
    }

  }

  public removeQuantity(product) : void {
    
    if(product.quantity == 1) {
      return;
    }

    product.quantity--;

    if(product.selected) {
      this.total = this.total - (product.price * (1 - ((product.promotionPercentage) / 1000)));
    }

  }

  public selectProduct(product) {
    
    if(this.bag.includes(product)) {
      
      this.bag = this.bag.filter((pr) => {
        return pr.id != product.id 
      });

      product.selected = false;
      this.total = this.total - ((product.price * (1 - (product.promotionPercentage / 1000))) * product.quantity);
    } else {
      this.total = this.total + (product.price * (1 - ((product.promotionPercentage) / 1000))) * product.quantity;
      product.selected = true;
      this.bag.push(product);
    }

  }

  public doInfinite(infiniteScroll) : void {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {
      this.productService.getClientProduct(this.offsetPagination, this.definedType, this.establishmentId).subscribe({
        next: data => {
          this.products = this.products.concat(data.content);
          complete();
        }
      });
    });
  }

  public getFormattedPrice(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  }

  public getDiscountedPrice(price : number, percent : number) {

    let discounted = price - (price * (1 - percent / 1000));

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(discounted);
  }

  public parseProductType(type) : string {
    return this.types[type];
  }

  public order() : void {
    
    if(this.bag.length == 0) {
      AlertDefault.commonAlert("Selecione o seu produto!");
      return;
    }

    this.orderRequest.id = 0;
    this.orderRequest.pickType = this.pickType[this.definedType];
    this.orderRequest.amountPerProduct = this.getAmountPerProduct();

    AlertDefault.getPaymentType(this.paymentType, (paymentType) => {
      
      this.orderRequest.paymentType = paymentType;

      console.log(JSON.stringify(this.orderRequest));

      this.orderService.requestOrder(this.orderRequest).subscribe({
        next: (data) => {
          AlertDefault.commonAlert('Pedido realizado com sucesso!');
        }
      })

    });


  }

  private getAmountPerProduct() {
    
    let map = {};

    this.bag.forEach(product => {
      map[product.id] = product.quantity
    })

    return map;

  }

}
