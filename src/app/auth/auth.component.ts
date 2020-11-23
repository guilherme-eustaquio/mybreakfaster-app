import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
    registration: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private router: Router,
    private dataService : DataService,
    public alertController: AlertController) {
  }

  ngOnInit(): void {}

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public createUser() : void {

    let body = this.createUserForm;
    
    this.dataService.create('users', body).subscribe({
      next: data => {
        this.presentAlert({
          header: "Alerta",
          subheader: "",
          message: "Usuário criado com sucesso!"
        });
      },
      error: error => {
        this.presentAlert({
          header: `Erro (${error.status})`,
          subheader: "",
          message: error.error.message
        });
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
