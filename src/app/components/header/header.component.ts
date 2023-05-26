import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { Router } from '@angular/router';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';
import { DeliveryDialogComponent } from '../delivery-dialog/delivery-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public deliveryType!: string;
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
    this.openDeliveryDialog();
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
    this.dialog.open(DeliveryDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      maxWidth: '750px',
      maxHeight: '550px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      this.deliveryType = result;
    });
  }
  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      maxWidth: '680px',
      maxHeight: '690px',
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
