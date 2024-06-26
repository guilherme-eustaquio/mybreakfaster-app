import { SessionHandler } from './../../miscellaneous/session-handler.class';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScroll } from 'src/app/miscellaneous/infinite-scroll.class';
import { Establishment } from 'src/app/models/establishment.model';
import { Pageable } from 'src/app/models/pageable.model';
import { EstablishmentService } from 'src/app/services/bussiness/establishment.service';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnInit {

  private establishments : Establishment[];
  private pagination : Pageable;
  private offsetPagination : number = 0;
  private types = [
    'DELIVERY',
    'WITHDRAWAL_ON_STORE',
    'DELIVERY_AND_WITHDRAWAL'
  ];
  
  constructor(private establishmentService : EstablishmentService, 
    private router: Router) {
  }

  public getEstablishments() : Establishment[] {
    return this.establishments;
  }

  public doRefresh(event) {

    if(SessionHandler.getUserDetails().address.length == 0) {
      return;
    }

    InfiniteScroll.doRefresh(event, (complete) => {
      this.establishmentService.get(0, SessionHandler.getUserDetails().address[0].city).subscribe({
        next:(data) => {
          this.establishments = data.content;
          this.pagination = new Pageable();
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
          complete();
          this.offsetPagination = 0;

        }
      })
    });
  }

  doInfinite(infiniteScroll) {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {

      this.establishmentService.get(this.offsetPagination, SessionHandler.getUserDetails().address[0].city).subscribe({
        next: data => {
          this.establishments = this.establishments.concat(data.content);
          complete();
        }
      });    
    });
  }

  public openEstablishment(establishment) : void {
    AlertDefault.indentifyPlace(() => {
      this.setPlace(establishment, this.types[1])
    }, () => {
      this.setPlace(establishment, this.types[0])
    });
  }

  public setPlace(establishment, type) : void {

    let settings = {
      id: establishment.id,
      type: type
    };

    this.router.navigate(['/dashboard/list-products'], {queryParams:settings})
  }

  public handleAddress(address : any) : any {
    return {
      street: address[0].street,
      number: address[0].number,
      neighborhood: address[0].neighborhood,
      city: address[0].city
    };
  }

  ngOnInit() {

    if(this.router.url.includes('/dashboard/establishment')) {
      
      if(SessionHandler.getUserDetails().address.length > 0) {

        this.establishmentService.get(0, SessionHandler.getUserDetails().address[0].city).subscribe(establishments => {
          this.pagination = new Pageable();
          this.pagination.totalElements = establishments.totalElements;
          this.pagination.totalPages = establishments.totalPages;
          this.establishments = establishments.content;
        });
      }
    }
  }
}
