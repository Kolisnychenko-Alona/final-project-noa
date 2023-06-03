import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAdressComponent } from '../add-adress/add-adress.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/interfaces/adress/IAddress';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Router } from '@angular/router';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  public personalForm!: FormGroup;
  public currentUserId!: string;
  public userAddress!: Array<IAddress>;
  public isEdit = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private productService: ProductService,
    private thaiService: ThaiProductService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.personalForm.valueChanges.subscribe(() => {
      this.isEdit = true;
    });
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
    this.userAddress = user.address;
    this.currentUserId = user.uid;
    this.personalForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, Validators.required],
      address: [user.address],
    });
  }

  addAdress(): void {
    this.dialog
      .open(AddAdressComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'dialog-inner',
        maxWidth: '680px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.userAddress.push(result);
        this.personalForm.patchValue({
          address: this.userAddress,
        });
        let user = JSON.parse(localStorage.getItem('currentUser') as string);
        user.address.push(result);
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
  }

  saveChanges(): void {
    this.accountService
      .update(this.personalForm.value, this.currentUserId)
      .then(() => {
        this.toastr.success('Changes successfully saved');
      });
    this.isEdit = false;
  }
  deleteAddress(i: number): void {
    this.userAddress.splice(i, 1);
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    user.address = this.userAddress;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.personalForm.patchValue({
      address: this.userAddress,
    });
  }
  logOut(): void {
    this.router.navigate(['/']);
    let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    if (favorites) {
      favorites.forEach((prod: IProductResponse) => (prod.favorite = false));
      for (let i = 0; i < favorites.length; i++) {
        this.productService.getOne(favorites[i].id).subscribe((data) => {
          if (data) {
            this.productService.update(favorites[i], favorites[i].id);
          }
        });
        this.thaiService.getOne(favorites[i].id).subscribe((data) => {
          if (data) {
            this.thaiService.update(favorites[i], favorites[i].id);
          }
        });
      }
    }
    localStorage.clear();
    this.accountService.isLogin$.next(true);
  }
}
