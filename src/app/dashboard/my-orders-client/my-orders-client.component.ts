import { DateFormatter } from './../../miscellaneous/date-formatter.class';
import { OrderConstant } from './../../miscellaneous/order-constant.class';
import { OrderService } from './../../services/bussiness/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Order } from 'src/app/models/order.model';
import { Pageable } from 'src/app/models/pageable.model';
import { MessageService } from 'src/app/services/generic/message.service';
import { RateService } from 'src/app/services/bussiness/rate.service';

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
    private rateService : RateService,
    private router : Router) { }

  ngOnInit() {

    if(this.router.url.includes('/dashboard/my-orders-client')) {
      this.orderService.getClientOrders(0).subscribe({
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
      this.orderService.getClientOrders(0).subscribe({
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
    return OrderConstant.ORDER_STATUS_CLIENT[status];
  }

  public showAcceptReceivement(receiveType : string) : boolean {
    return receiveType == "ON_ROUTE";
  }

  public showCancel(receiveType : string) : boolean {
    return receiveType == "WAITING_ESTABLISHMENT_APPROVAL";
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
  
  public cancelOrder(order : any) : void {

    let body = {status: "CANCELED_BY_CLIENT"};

    AlertDefault.confirmationAlert("Quer mesmo cancelar o pedido?", () => {
      this.orderService.setOrderStatus(body, order.id).subscribe({
        next: data => {
          AlertDefault.commonAlert("Cancelado com sucesso!");
          order.status = body.status;
        }
      });
    });

  }

  public confirmOrder(order : any) : void {

    let body = {status: "DELIVERY_CONFIRMED"};

    AlertDefault.confirmationAlert("Você recebeu o pedido?", () => {
      this.orderService.setOrderStatus(body, order.id).subscribe({
        next: data => {
          order.status = body.status;

          this.rateEstablishment(order);
        }
      });
    });
  }

  public rateEstablishment(order) : void {

    AlertDefault.rateAlert((score) => {
      
      let body = {
        receiver: order.orderProducts[0].product.establishment,
        score: score
      }

      this.rateService.rate(body).subscribe({
        next:data => {
          AlertDefault.commonAlert("Avaliado com sucesso!");
          this.router.navigateByUrl('/dashboard/establishment');
        }
      });

    });
  }

  rateEstablishmentButton(receiveType : string) : boolean {
    return receiveType == "WITHDRAWN";
  }

  public getProductDetail(order : any) : any {
    
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

}
