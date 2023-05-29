import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { HistoryComponent } from './history/history.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'favorite-products', component: FavoriteProductsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal-data' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}