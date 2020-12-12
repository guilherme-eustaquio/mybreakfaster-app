import { ListProductsComponent } from './list-products/list-products.component';
import { ManipulatePromotionComponent } from './manipulate-promotion/manipulate-promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionService } from './../services/bussiness/promotion.service';
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
import { AddressService } from '../services/bussiness/address.service';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductService } from '../services/bussiness/product.service';
import { ManipulateProductComponent } from './manipulate-product/manipulate-product.component';

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
    AddAddressComponent,
    ListAddressComponent,
    MyProductsComponent,
    ManipulateProductComponent,
    ManipulatePromotionComponent,
    PromotionsComponent,
    ListProductsComponent
  ],
  providers: [
    EstablishmentService,
    UserService,
    AddressService,
    ProductService,
    PromotionService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
