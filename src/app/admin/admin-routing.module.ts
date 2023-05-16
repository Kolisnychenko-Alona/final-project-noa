import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminResponseComponent} from './admin-response/admin-response.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminThaiComponent } from './admin-thai/admin-thai.component';
import { AdminThaiProductComponent } from './admin-thai-product/admin-thai-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'thai', component: AdminThaiComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'thaiProduct', component: AdminThaiProductComponent },
      { path: 'response', component: AdminResponseComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'vacancies', component: AdminVacanciesComponent },
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
