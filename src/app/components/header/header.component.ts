import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryComponent } from 'src/app/pages/delivery/delivery.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { Router } from '@angular/router';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public deliveryType: string = `Доставка кур'єром`;
  public total!: number;
  public isOpenMenu = false;
  public isDown = false;

  public userCategories: Array<ICategoryResponse> = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  down(btn: HTMLElement): void {
    btn.classList.add('down');
  }
  up(btn: HTMLElement): void {
    btn.classList.remove('down');
  }
  openCatalog(catalog: HTMLElement): void {
    catalog.classList.add('openCatalog');
  }
  closeCatalog(catalog: HTMLElement): void {
    catalog.classList.remove('openCatalog');
  }
  toProducts(catalog: HTMLElement): void {
    catalog.classList.remove('openCatalog');
    this.router.navigate(['/product']);
  }
  
  openProducts(catalog: HTMLElement): void {
    this.closeCatalog(catalog);
  }
  openPhoneDialog(phone: HTMLElement): void {
    console.log(phone);
    phone.classList.add('openPhone');
  }
  closePhoneDialog(phone: HTMLElement): void {
    console.log('close phone', phone);
    phone.classList.remove('openPhone');
  }

  openDeliveryDialog(): void {
    this.dialog.open(DeliveryComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      width: '750px',
      height: '425px',
      // disableClose: true
    });
  }
  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      minWidth: '380px',
      height: '200px',
    });
  }
  openBasketDialog(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'dialog-back',
      width: '500px',
      height: '100vh',
      position: { top: '0', right: '0' },
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.userCategories = data as ICategoryResponse[];
    });
  }
}
