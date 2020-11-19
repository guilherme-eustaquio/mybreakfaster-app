import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AuthRoutingModule,
  ],
  declarations: [AuthComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AuthModule { }
