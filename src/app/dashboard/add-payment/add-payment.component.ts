import { MessageCode } from 'src/app/enum/message-code.enum';
import { MessageService } from './../../services/generic/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { Card } from 'src/app/models/card.model';
import { PaymentService } from 'src/app/services/bussiness/payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {

  public addCard = new FormGroup({
    type: new FormControl(''),
    number: new FormControl(''),
    expirationDate: new FormControl(''),
    flag: new FormControl(''),
    name: new FormControl(''),
    main: new FormControl(false)
  });

  public cards : Card[] = [];

  constructor(private paymentService : PaymentService,
    private router : Router,
    private messsageService : MessageService) {}

  public createCard() : void {
    this.paymentService.addCard(this.addCard.getRawValue()).subscribe({
      next: data => {
        AlertDefault.commonAlert("Cartão criado com sucesso!");
        this.router.navigateByUrl('dashboard/payment/cards');
        this.messsageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_CARDS_LIST, data);
      }
    })
  }

  ngOnInit() {}

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }
}
