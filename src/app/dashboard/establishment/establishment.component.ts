import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCode } from 'src/app/enum/message-code.enum';
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
  
  constructor(private establishmentService : EstablishmentService, 
    private router: Router) {
  }

  public getEstablishments() : Establishment[] {
    return this.establishments;
  }

  doInfinite(infiniteScroll) {
    
    this.offsetPagination = InfiniteScroll.handlePageable(this.offsetPagination, this.pagination);

    InfiniteScroll.doInfinite({
      offsetPagination: this.offsetPagination,
      pagination: this.pagination,
      infiniteScroll:infiniteScroll
    }, (complete) => {

      this.establishmentService.get(this.offsetPagination).subscribe({
        next: data => {
          this.establishments = this.establishments.concat(data.content);
          complete();
        }
      });    
    });

  }

  ngOnInit() {
    if(this.router.url.includes('/dashboard/establishment')) {
      this.establishmentService.get(0).subscribe(establishments => {
        this.pagination = new Pageable();
        this.pagination.totalElements = establishments.totalElements;
        this.pagination.totalPages = establishments.totalPages;
        this.establishments = establishments.content;
      });
    }
  }
}
