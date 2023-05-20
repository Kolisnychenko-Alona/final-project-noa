import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


const MATERIAL = [
  MatDialogModule,
  MatSelectModule
];

//other modules

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '../pages/product/product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductComponent],
  imports: [...MATERIAL, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [...MATERIAL, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ProductComponent],
})
export class SharedModule {}
