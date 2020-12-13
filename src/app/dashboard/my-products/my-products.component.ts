import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Pageable } from 'src/app/models/pageable.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/bussiness/product.service';
import { MessageService } from 'src/app/services/generic/message.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {

  public products : Product[];
  private offsetPagination : number = 0;
  private pagination : Pageable;
  private types = {
    DELIVERY: "Delivery",
    WITHDRAWAL_ON_STORE: "Somente no estabelecimento",
    DELIVERY_AND_WITHDRAWAL: "Estabelecimento e delivery"
  };

  constructor(private productService : ProductService, 
    private messageService : MessageService,
    private router : Router) { }

  ngOnInit() {
    if(this.router.url.includes('/dashboard/my-products')) {

      this.productService.getProduct(0).subscribe({
        next: data => {
          this.products = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
          this.waitForUpdate();
        }
      });
    }
  }

  public waitForUpdate() : void {
    this.messageService.listenMessageFromAnotherComponent().subscribe(data => {
      if(data.exec != null) {
        switch(data.exec) {
          case MessageCode.UPDATE_MY_PRODUCTS_LIST:

            for(let count = 0; count < this.products.length; count++) {
              if(this.products[count].id == data.message.id) {
                this.products[count] = data.message;
                break;
              }
            }

            break;
        }
      }
    })
  }

  public doInfinite(infiniteScroll) : void {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {
      this.productService.getProduct(this.offsetPagination).subscribe({
        next: data => {
          this.products = this.products.concat(data.content);
          complete();
        }
      });
    });
  }

  public doRefresh(event) {
    InfiniteScroll.doRefresh(event, (complete) => {
      this.productService.getProduct(0).subscribe({
        next:(data) => {
          this.products = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
          complete();
          this.offsetPagination = 0;

        }
      })
    });
  }

  public getFormattedPrice(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  }

  public deleteProduct(product : any) : void {
    
    AlertDefault.confirmationAlert("Tem certeza que quer excluir este produto?", () => {
      this.productService.deleteProduct(product.id).subscribe({
        next: data => {
          
          AlertDefault.commonAlert("Produto excluído com sucesso!");
          
          this.products = this.products.filter((obj) => {
            return obj !== product;
          })

        }
      })      
    });
  }

  public editProduct(product : any) : void {
    this.router.navigate(['dashboard/my-products/edit-product'], {queryParams:product});
  }

  public parseProductType(type) : string {
    return this.types[type];
  }

}
