import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminResponseComponent } from './admin-response/admin-response.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';
import { AdminThaiComponent } from './admin-thai/admin-thai.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminResponseComponent,
    AdminOrdersComponent,
    AdminVacanciesComponent,
    AdminThaiComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
