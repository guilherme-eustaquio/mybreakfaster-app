import { MessageService } from './../../services/generic/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { AddressService } from 'src/app/services/bussiness/address.service';
import { MessageCode } from 'src/app/enum/message-code.enum';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {

  public addAddress = new FormGroup({
    street: new FormControl(''),
    number: new FormControl(''),
    neighborhood: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    zipCode: new FormControl(''),
    main: new FormControl(false)
  });

  public states = ['MG', 'SP', 'GO', 'MT'];
  public countries = ['Brasil'];
  public cities = ['Uberlândia', 'Campinas', 'Caldas Novas'];


  constructor(private addressService : AddressService,
    private router : Router,
    private messageService : MessageService) { }

  public createAddress() : void {

    this.addressService.addAddress(this.addAddress.getRawValue()).subscribe({
      next: data => {
        AlertDefault.commonAlert("Endereço criado com sucesso!");
        this.messageService.sendMessageToAnotherComponent(MessageCode.UPDATE_MY_ADDRESS_LIST, data);
        this.router.navigateByUrl('dashboard/address/addresses');
      }
    })
  }

  ngOnInit() {
  }
}
