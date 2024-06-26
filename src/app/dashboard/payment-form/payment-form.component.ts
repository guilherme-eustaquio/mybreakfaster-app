import { MessageService } from './../../services/generic/message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Card } from 'src/app/models/card.model';
import { Pageable } from 'src/app/models/pageable.model';
import { PaymentService } from 'src/app/services/bussiness/payment.service';
import { MessageCode } from 'src/app/enum/message-code.enum';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {

  public cards : Card[] = [];
  private pagination : Pageable;
  private offsetPagination : number = 0;

  constructor(private paymentService : PaymentService,
    private router : Router,
    private messageService : MessageService) {}

  ngOnInit() {
    this.paymentService.getCards(0).subscribe({
      next: data => {
        this.cards = data.content;
        this.pagination = new Pageable();
        this.pagination.totalElements = data.totalElements;
        this.pagination.totalPages = data.totalPages;
        this.waitForUpdate();
      }
    });
  }

  public waitForUpdate() : void {
    this.messageService.listenMessageFromAnotherComponent().subscribe(data => {
      if(data.exec != null) {
        switch(data.exec) {
          case MessageCode.UPDATE_MY_CARDS_LIST:
            this.cards.unshift(data.message);
            break;
        }
      }
    })
  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public doInfinite(infiniteScroll) : void {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {
      this.paymentService.getCards(this.offsetPagination).subscribe({
        next: data => {
          this.cards = this.cards.concat(data.content);
          complete();
        }
      });
    });
  }

  public deleteCard(card : any) : void {
    
    AlertDefault.confirmationAlert("Tem certeza que quer excluir este cartão?", () => {
      this.paymentService.deleteCard(card.id).subscribe({
        next: data => {
          
          AlertDefault.commonAlert("Cartão excluído com sucesso!");
          
          this.cards = this.cards.filter((obj) => {
            return obj !== card;
          })

        }
      })      
    });
  }

  public doRefresh(event) {
    InfiniteScroll.doRefresh(event, (complete) => {
      this.paymentService.getCards(0).subscribe({
        next:(data) => {
          this.cards = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
          complete();
          this.offsetPagination = 0;
        }
      })
    });
  }

  public setMyCardAsMain(card : any) : void {

    AlertDefault.confirmationAlert("Deseja deixar esse cartão como principal?", () => {
      this.paymentService.upgradeCard(card.id).subscribe({
        next: data => {
          
          this.cards = this.cards.map((obj) => {
            
            if(obj.main) {
              obj.main = false;
            }
            
            return obj;
          });

          card.main = true;

          AlertDefault.commonAlert("Cartão definido como principal!");
        }
      })
    })
  }

}
