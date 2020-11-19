import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  public currentYear : number = new Date().getFullYear();

  constructor(private router: Router) {
  }
}
