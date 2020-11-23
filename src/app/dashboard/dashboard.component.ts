import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

}
