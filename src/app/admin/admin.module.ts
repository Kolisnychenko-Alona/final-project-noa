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
import { AdminThaiProductComponent } from './admin-thai-product/admin-thai-product.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminResponseComponent,
    AdminOrdersComponent,
    AdminVacanciesComponent,
    AdminThaiComponent,
    AdminThaiProductComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
