import { DateFormatter } from './../../miscellaneous/date-formatter.class';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Pageable } from 'src/app/models/pageable.model';
import { Promotion } from 'src/app/models/promotion.model';
import { PromotionService } from 'src/app/services/bussiness/promotion.service';
import { MessageService } from 'src/app/services/generic/message.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {

  public promotions : Promotion[];
  private offsetPagination : number = 0;
  private pagination : Pageable;

  constructor(private promotionService : PromotionService, 
    private messageService : MessageService,
    private router : Router) { }

  ngOnInit() {

    if(this.router.url.includes('/dashboard/promotions')) {

      this.promotionService.getPromotion(0).subscribe({
        next: data => {
          this.promotions = data.content;
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
          case MessageCode.UPDATE_MY_PROMOTION_LIST:
            
            for(let count = 0; count < this.promotions.length; count++) {
              if(this.promotions[count].id == data.message.id) {
                this.promotions[count] = data.message;
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
      this.promotionService.getPromotion(this.offsetPagination).subscribe({
        next: data => {
          this.promotions = this.promotions.concat(data.content);
          complete();
        }
      });
    });
  }

  public doRefresh(event) {
    InfiniteScroll.doRefresh(event, (complete) => {
      this.promotionService.getPromotion(0).subscribe({
        next:(data) => {
          this.promotions = data.content;
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

  public getFormattedDate(date : string) : string {
    return DateFormatter.getFormattedDate(date);
  }

  public editPromotion(promotion : any) : void {
    this.router.navigate(['dashboard/promotions/edit-promotion'], {queryParams:promotion});
  }

}
