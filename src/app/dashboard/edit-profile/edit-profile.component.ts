import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Session } from 'protractor';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
import { SessionHandler } from 'src/app/miscellaneous/session-handler.class';
import { UserService } from 'src/app/services/bussiness/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public editUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private userService : UserService) { }

  public edit() : void {

    this.userService.updateProfile(this.editUserForm.getRawValue()).subscribe({
      next: data => {
        SessionHandler.setUserDetails(data);
        AlertDefault.commonAlert("Usuário atualizado com sucesso!");
      }
    })
  }

  ngOnInit() {
    this.editUserForm.get('name').setValue(SessionHandler.getUserDetails().name);
    this.editUserForm.get('email').setValue(SessionHandler.getUserDetails().email);
    this.editUserForm.get('phoneNumber').setValue(SessionHandler.getUserDetails().phoneNumber);
  }

}
