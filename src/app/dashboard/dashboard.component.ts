import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private jwtService : JwtService) { }

  ngOnInit() {
    if(!this.jwtService.loggedIn) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  public logout() : void {

  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

}
