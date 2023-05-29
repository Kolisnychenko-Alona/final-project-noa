import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { HistoryComponent } from './history/history.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAdressComponent } from './add-adress/add-adress.component';

@NgModule({
  declarations: [
    CabinetComponent,
    PersonalDataComponent,
    HistoryComponent,
    FavoriteProductsComponent,
    ChangePasswordComponent,
    AddAdressComponent
  ],
  imports: [CommonModule, SharedModule, CabinetRoutingModule],
})
export class CabinetModule {}
