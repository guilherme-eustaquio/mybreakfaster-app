import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { JwtService } from '../services/auth/jwt.service';
import { DataService } from '../services/generic/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public currentYear : number = new Date().getFullYear();
  public createUserForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    register: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  public loginUserForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router,
    private dataService : DataService,
    private jwtService : JwtService,
    public alertController: AlertController) {
  }

  ngOnInit(): void {

    if(this.jwtService.loggedIn) {
      this.router.navigateByUrl('/dashboard/establishment');
    }

  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public login() : void {

    let body = this.loginUserForm.getRawValue();

    this.jwtService.login(body.email, body.password).subscribe({
      next: data => {
        this.router.navigateByUrl("/dashboard/establishment");
      }
    });
  }

  public createUser() : void {
    
    this.dataService.post('users', this.createUserForm.getRawValue(), false).subscribe({
      next: data => {
        this.presentAlert({
          header: "Alerta",
          subheader: "",
          message: "Usuário criado com sucesso!"
        });
        this.router.navigateByUrl("/auth/login");
      }
    });
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


}
