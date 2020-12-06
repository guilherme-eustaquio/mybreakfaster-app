import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/bussiness/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {

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

  private adresses : Address[] = [];

  constructor(private addressService : AddressService,
    public alertController: AlertController,
    private router : Router) { }

  public createAddress() : void {
    this.addressService.addAddress(this.addAddress.getRawValue()).subscribe({
      next: data => {
        this.presentAlert({
          header: "Alerta",
          subheader: "",
          message: "Endereço criado com sucesso!"
        });

        this.router.navigateByUrl('dashboard/address/addresses');
      }      
    })
  }

  public getAddresses() : Address[] {
    return this.adresses;
  }

  ngOnInit() {

    if(this.getCurrentRoute('address/addresses')) {

      this.addressService.getAddresses().subscribe({
        next: data => {
          this.adresses = data;
        }
      })
    }
  }

  async presentAlert(message : any) {
    const alert = await this.alertController.create({
      header: message.header,
      subHeader: message.subHeader,
      message: message.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }
}
