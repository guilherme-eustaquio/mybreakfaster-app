import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, 
    private jwtService : JwtService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let authInfo = {
      authenticated: this.jwtService.loggedIn
    };

    if (!authInfo.authenticated) {
      this.router.navigate(["auth/login"]);
      return false;
    }

    return true;
  }
}
