import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Address } from 'src/app/models/address.model';
import { Pageable } from 'src/app/models/pageable.model';
import { AddressService } from 'src/app/services/bussiness/address.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss'],
})
export class ListAddressComponent implements OnInit {


  public addresses : Address[] = [];
  private pagination : Pageable;
  private offsetPagination : number = 0;

  constructor(private addressService : AddressService,
    public alertController: AlertController) { }

  ngOnInit() {

    this.addressService.getAddresses(0).subscribe({
      next: data => {
        this.addresses = data.content;
        this.pagination = new Pageable();
        this.pagination.totalElements = data.totalElements;
        this.pagination.totalPages = data.totalPages;
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
      this.addressService.getAddresses(this.offsetPagination).subscribe({
        next: data => {
          this.addresses = this.addresses.concat(data.content);
          complete();
        }
      });
    });
  }

  public deleteAddress(address : any) : void {
    
    AlertDefault.confirmationAlert("Tem certeza que quer excluir este endereço?", () => {
      this.addressService.deleteAddress(address.id).subscribe({
        next: data => {
          
          AlertDefault.commonAlert("Endereço excluído com sucesso!");
          
          this.addresses = this.addresses.filter((obj) => {
            return obj !== address;
          })

        }
      })      
    });
  }

  public setMyAddressAsMain(address : any) : void {

    AlertDefault.confirmationAlert("Deseja deixar esse endereço como principal?", () => {
      this.addressService.upgradeAddress(address.id).subscribe({
        next: data => {
          
          this.addresses = this.addresses.map((obj) => {
            
            if(obj.main) {
              obj.main = false;
            }
            
            return obj;
          });

          address.main = true;

          AlertDefault.commonAlert("Endereço definido como principal!");
        }
      })
    })
  }
}
