import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'establishment', component: DashboardComponent
  },
  {
    path: 'user-menu', component: DashboardComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: 'payment/cards', component: PaymentFormComponent
  },
  {
    path: 'payment/add-card', component: AddPaymentComponent
  },
  {
    path: 'address/addresses', component: EditAddressComponent
  },
  {
    path: 'address/add-address', component: EditAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
