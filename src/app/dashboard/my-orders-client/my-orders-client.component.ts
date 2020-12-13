import { DateFormatter } from './../../miscellaneous/date-formatter.class';
import { OrderConstant } from './../../miscellaneous/order-constant.class';
import { OrderService } from './../../services/bussiness/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Order } from 'src/app/models/order.model';
import { Pageable } from 'src/app/models/pageable.model';
import { MessageService } from 'src/app/services/generic/message.service';

@Component({
  selector: 'app-my-orders-client',
  templateUrl: './my-orders-client.component.html',
  styleUrls: ['./my-orders-client.component.scss'],
})
export class MyOrdersClientComponent implements OnInit {

  public orders : Order[];
  private offsetPagination : number = 0;
  private pagination : Pageable;

  constructor(private orderService : OrderService, 
    private messageService : MessageService,
    private router : Router) { }

  ngOnInit() {

    if(this.router.url.includes('/dashboard/my-orders-client')) {
      this.orderService.getClientOrders(0).subscribe({
        next:(data) => {
          this.orders = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
        }
      })
    }
  }

  public doRefresh(event) {
    InfiniteScroll.doRefresh(event, (complete) => {
      this.orderService.getClientOrders(0).subscribe({
        next:(data) => {
          this.orders = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
          complete();
          this.offsetPagination = 0;

        }
      })
    });
  }

  public doInfinite(infiniteScroll) : void {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {
      this.orderService.getClientOrders(this.offsetPagination).subscribe({
        next: data => {
          this.orders = this.orders.concat(data.content);
          complete();
        }
      });
    });
  }

  public getFormattedPrice(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  }

  public getPickType(pickType : string) : string {
    return OrderConstant.PICK_TYPE[pickType];
  }

  public getStatusType(status : string) : string {
    return OrderConstant.ORDER_STATUS[status];
  }

  public showAcceptReceivement(receiveType : string) : boolean {
    return receiveType == "DELIVERED" || 
           receiveType == "WITHDRAWN";
  }

  public showCancel(receiveType : string) : boolean {
    return receiveType == "BEING_PREPARED";
  }

  public getFormattedDate(date : string) : string {
    return DateFormatter.getFormattedDate(date);
  }

}
