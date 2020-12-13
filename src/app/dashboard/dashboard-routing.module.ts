import { ManipulatePromotionComponent } from './manipulate-promotion/manipulate-promotion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { ManipulateProductComponent } from './manipulate-product/manipulate-product.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'establishment', component: DashboardComponent
  },
  {
    path: 'my-orders-client', component: DashboardComponent
  },
  {
    path: 'user-menu', component: DashboardComponent,
  },
  {
    path: 'my-products', component: DashboardComponent
  },
  {
    path: 'list-products', component: DashboardComponent
  },
  {
    path: 'promotions', component: DashboardComponent
  },
  {
    path: 'promotions/add-promotion', component: ManipulatePromotionComponent
  },
  {
    path: 'promotions/edit-promotion', component: ManipulatePromotionComponent
  },
  {
    path: 'my-products/add-product', component: ManipulateProductComponent
  },
  {
    path: 'my-products/edit-product', component: ManipulateProductComponent
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
    path: 'address/addresses', component: ListAddressComponent
  },
  {
    path: 'address/add-address', component: AddAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
