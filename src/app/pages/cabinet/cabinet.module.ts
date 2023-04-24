import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';

@NgModule({
  declarations: [CabinetComponent],
  imports: [CommonModule, SharedModule, CabinetRoutingModule],
})
export class CabinetModule {}
