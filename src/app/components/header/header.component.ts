import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryComponent } from 'src/app/pages/delivery/delivery.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { Router } from '@angular/router';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';

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
  public userThaiCategories: Array<ICategoryResponse> = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private categoryService: CategoryService,
    private thaiMarketService: ThaiMarketService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getThaiCategories();
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
  openPhoneDialog(phone: HTMLElement): void {
    phone.classList.add('openPhone');
  }
  closePhoneDialog(phone: HTMLElement): void {
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
  getThaiCategories() {
    this.thaiMarketService.getAll().subscribe((data) => {
      this.userThaiCategories = data as ICategoryResponse[];
    });
  }
}
