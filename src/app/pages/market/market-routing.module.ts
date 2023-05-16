import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market.component';
import { MarketProductInfoComponent } from './market-product-info/market-product-info.component';
import { ThaiProductInfoResolver } from 'src/app/shared/services/thai-product/thai-product-info.resolver';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
  },
  {
    path: ':id',
    component: MarketProductInfoComponent,
    resolve: { thaiProductInfo: ThaiProductInfoResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
