import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { NavigationComponent } from './app-navigation/navigation.component';
import { EstablishmentComponent } from './establishment/establishment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EstablishmentService } from '../services/bussiness/establishment.service';
import { UserService } from '../services/bussiness/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressService } from '../services/bussiness/address.service';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent, 
    UserNavigationComponent, 
    NavigationComponent,
    EstablishmentComponent,
    PaymentFormComponent,
    AddPaymentComponent,
    EditProfileComponent,
    EditAddressComponent
  ],
  providers: [
    EstablishmentService,
    UserService,
    AddressService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
