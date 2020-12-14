import { DateFormatter } from '../../miscellaneous/date-formatter.class';
import { OrderConstant } from '../../miscellaneous/order-constant.class';
import { OrderService } from '../../services/bussiness/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Order } from 'src/app/models/order.model';
import { Pageable } from 'src/app/models/pageable.model';
import { MessageService } from 'src/app/services/generic/message.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {

  public orders : Order[];
  private offsetPagination : number = 0;
  private pagination : Pageable;

  constructor(private orderService : OrderService, 
    private messageService : MessageService,
    private router : Router) { }

  ngOnInit() {

    if(this.router.url == '/dashboard/my-orders') {
      this.orderService.getEstablishmentOrders(0).subscribe({
        next:(data) => {
          data.content = this.initializeDetail(data.content);
          this.orders = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
        }
      })
    }
  }

  public initializeDetail(content) {
    return content.filter(order => {
      order.detail = false; 
      return order;
    })
  }

  public doRefresh(event) {
    InfiniteScroll.doRefresh(event, (complete) => {
      this.orderService.getEstablishmentOrders(0).subscribe({
        next:(data) => {

          data.content = this.initializeDetail(data.content);

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
      this.orderService.getEstablishmentOrders(this.offsetPagination).subscribe({
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
    return receiveType == "BEING_PREPARED" 
    || receiveType == "WAITING_ESTABLISHMENT_APPROVAL";
  }

  public prepareOrderButton(receiveType : string) : boolean {
    return receiveType == "WAITING_ESTABLISHMENT_APPROVAL";
  }

  public sendOrderButton(receiveType : string) : boolean {
    return receiveType == "BEING_PREPARED";
  }

  public getFormattedDate(date : string) : string {
    return DateFormatter.getFormattedDate(date);
  }

  public changeTextDetailButton(order : any) : string {
    return order.detail == false ? "Ver detalhes" : "Esconder detalhes";
  }

  public seeDetails(order : any) : void {
    order.detail = !order.detail;
  }

  public prepareOrder(order : any) : void {

    let body = {status: "BEING_PREPARED"};

    this.orderService.setOrderStatus(body, order.id).subscribe({
      next: data => {
        AlertDefault.commonAlert("Pedido sendo preparado com sucesso!");
        order.status = body.status;
      }
    });
  }

  getProductDetail(order : any) : any {
    
    let orderProducts = order.orderProducts;
    let products = [];

    orderProducts.forEach(orderProduct => {
      products.push({
        amount: orderProduct.amount,
        price: orderProduct.product.price,
        name: orderProduct.product.name
      });
    });

    return products;
  }

  public sendOrder(order : any) : void {

    let body = null;

    body = {status: "READY_TO_BE_PICKED"};

    this.orderService.setOrderStatus(body, order.id).subscribe({
      next: data => {
        AlertDefault.commonAlert("Pedido enviado com sucesso!");
        order.status = body.status;
      }
    });
  }

  public cancelOrder(order : any) : void {

    let body = {status: "CANCELED_BY_ESTABLISHMENT"};

    AlertDefault.confirmationAlert("Quer mesmo cancelar o pedido?", () => {
      this.orderService.setOrderStatus(body, order.id).subscribe({
        next: data => {
          AlertDefault.commonAlert("Cancelado com sucesso!");
          order.status = body.status;
        }
      });
    });
  }

  public deliverOrder(order : any) : void {

    let body = {status: "WITHDRAWN"};

    this.orderService.setOrderStatus(body, order.id).subscribe({
      next: data => {
        AlertDefault.commonAlert("Entregue com sucesso!");
        order.status = body.status;
      }
    });

  }

  public deliverOrderButton(status : string) : boolean {
    return status == "READY_TO_BE_PICKED";
  } 

}
