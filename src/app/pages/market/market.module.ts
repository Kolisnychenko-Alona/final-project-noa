import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market.component';
import { MarketProductInfoComponent } from './market-product-info/market-product-info.component';

@NgModule({
  declarations: [MarketComponent, MarketProductInfoComponent],
  imports: [CommonModule, SharedModule, MarketRoutingModule],
})
export class MarketModule {}
