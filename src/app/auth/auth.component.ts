import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { JwtService } from '../services/jwt.service';

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

  ngOnInit(): void {}

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public login() : void {

    let body = this.loginUserForm.getRawValue();

    this.jwtService.login(body.email, body.password).subscribe({
      next: data => {
        this.router.navigateByUrl("/dashboard/establishment");
      },
      error: error => {
        this.presentAlert({
          header: `Erro (${error.status})`,
          subheader: "",
          message: this.handleExceptionMessage(error.error)
        });
      }
    });
  }

  public createUser() : void {
    
    this.dataService.create('users', this.createUserForm.getRawValue()).subscribe({
      next: data => {
        console.log(data);
        this.presentAlert({
          header: "Alerta",
          subheader: "",
          message: "Usuário criado com sucesso!"
        });
        this.router.navigateByUrl("/auth/login");
      },
      error: error => {
        this.presentAlert({
          header: `Erro (${error.status})`,
          subheader: "",
          message: this.handleExceptionMessage(error.error)
        });
      }
    });
  }

  private handleExceptionMessage(messages) : string {

    if(Array.isArray(messages)) {

      let messageHandle = "";

      messages.forEach(message => {
        messageHandle += message.message + "<br>";
      });

      return messageHandle;

    } else {
      return messages.message;
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


}
