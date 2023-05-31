import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/interfaces/adress/IAddress';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrls: ['./add-adress.component.scss'],
})
export class AddAdressComponent implements OnInit {
  public addressForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddAdressComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      city: [null, Validators.required],
      street: [null, Validators.required],
      house: [null, Validators.required],
      apartment: [null],
      entrance: [null],
      flor: [null],
      cod: [null],
    });
  }

  add(): void {
    this.dialogRef.close(
      this.addressForm.value,
    );
    this.toastr.success('Address successfully added');
  }

}
