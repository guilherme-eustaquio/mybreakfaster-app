import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, UserNavigationComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
