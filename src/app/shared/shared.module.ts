import { NgModule } from '@angular/core';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// const MATERIAL = [
//   MatDialogModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatButtonModule,
// ];

//other modules

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
//   imports: [...MATERIAL, FormsModule, ReactiveFormsModule],
//   exports: [...MATERIAL, FormsModule, ReactiveFormsModule],
  imports: [FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
