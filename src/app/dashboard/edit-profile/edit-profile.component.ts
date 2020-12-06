import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlertDefault } from 'src/app/miscellaneous/alert-default.class';
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
        AlertDefault.commonAlert("Usuário atualizado com sucesso!");
      }
    })
  }

  ngOnInit() {

    this.userService.getUserDetails().subscribe({
      next: data => {
        this.editUserForm.get('name').setValue(data.name);
        this.editUserForm.get('email').setValue(data.email);
        this.editUserForm.get('phoneNumber').setValue(data.phoneNumber);

      }
    })

  }

}
