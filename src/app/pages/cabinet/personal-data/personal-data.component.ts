import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAdressComponent } from '../add-adress/add-adress.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/interfaces/adress/IAddress';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  public personalForm!: FormGroup;
  public currentUserId!: string;
  public userAddress: Array<IAddress> = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    let user = currentUser;
    // if (!currentUser) {
    //   user = {
    //     firstName: 'name',
    //     lastName: 'name',
    //     phone: '1',
    //     email: '@',
    //   };
    // }
    this.currentUserId = user.uid;
    this.personalForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, Validators.required],
      address: [user.address]
    });
    this.userAddress = user.address;
  }

  addAdress(): void {
    this.dialog.open(AddAdressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      maxWidth: '680px',
    });
  }

  saveChanges(): void {
    this.accountService
      .update(this.personalForm.value, this.currentUserId)
      .then(() => {
        this.toastr.success('Changes successfully saved');
      });
  }
}
