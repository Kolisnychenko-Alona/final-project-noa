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

@NgModule({
  declarations: [],
  imports: [...MATERIAL, FormsModule, ReactiveFormsModule],
  exports: [...MATERIAL, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
