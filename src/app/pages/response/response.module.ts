import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ResponseRoutingModule } from './response-routing.module';
import { ResponseComponent } from './response.component';

@NgModule({
  declarations: [ResponseComponent],
  imports: [CommonModule, SharedModule, ResponseRoutingModule],
})
export class ResponseModule {}
