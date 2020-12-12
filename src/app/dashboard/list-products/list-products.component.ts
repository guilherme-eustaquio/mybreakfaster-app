import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Pageable } from 'src/app/models/pageable.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/bussiness/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {

  public products : Product[];
  private offsetPagination : number = 0;
  private pagination : Pageable;
  private types = {
    DELIVERY: "Delivery",
    WITHDRAWAL_ON_STORE: "Somente no estabelecimento",
    DELIVERY_AND_WITHDRAWAL: "Estabelecimento e delivery"
  };

  public bag = [];

  private definedType = '';
  private establishmentId = 0;

  public total = 0;

  constructor(private productService : ProductService, 
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

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
        this.pagination = new Pageable();
        this.pagination.totalElements = data.totalElements;
        this.pagination.totalPages = data.totalPages;

        if(this.products.length == 0) {
          AlertDefault.commonAlert("Não há produtos disponíveis para essa modalidade.");
          this.router.navigateByUrl('dashboard/establishment');
        }

      }
    });
  }

  public selectProduct(product) {

    if(this.bag.includes(product)) {
      this.bag = this.bag.filter((pr) => {
        return pr.id != product.id 
      });

      this.total = this.total - (product.price * (1 - (product.promotionPercentage / 1000)));

    } else {
      this.total = this.total + (product.price * (1 - ((product.promotionPercentage) / 1000)));
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

  public parseProductType(type) : string {
    return this.types[type];
  }

}
