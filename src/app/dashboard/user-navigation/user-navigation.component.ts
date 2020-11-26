import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtService } from 'src/app/services/jwt.service';

const openedMenuClass = "navbar-collapse offcanvas-collapse open";
const closedMenuClass = "navbar-collapse offcanvas-collapse";

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
})
export class UserNavigationComponent implements OnInit {

  private menuClass = closedMenuClass;

  constructor(private router: Router, 
    private location: Location,
    private jwtService: JwtService) {}

  ngOnInit() {}

  public getCurrentClass() : string {    

    if(this.getCurrentRoute('user-menu')) {
      this.menuClass = openedMenuClass;
    } else {
      this.menuClass = closedMenuClass;
    }

    return this.menuClass;
  }

  public toggleMenu() : void {
    if(this.menuClass == closedMenuClass) {
      this.router.navigateByUrl('/dashboard/user-menu');
      this.menuClass = openedMenuClass;
    } else {
      this.location.back();
    }
  }

  private getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public logout() : void {
    this.jwtService.logout();
  }

}
