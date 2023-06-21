import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { Router } from '@angular/router';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';
import { DeliveryDialogComponent } from '../delivery-dialog/delivery-dialog.component';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ResponseComponent } from 'src/app/pages/response/response.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { OrderService } from 'src/app/shared/services/orders/order.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public deliveryType!: string;
  public total!: number;
  public count!: number;
  public isOpenMenu = false;
  public isDown = false;
  public userName!: string;
  public isUser = false;
  public isBasket = false;

  public userCategories: Array<ICategoryResponse> = [];
  public userThaiCategories: Array<ICategoryResponse> = [];
  public basket: Array<IProductResponse> = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private categoryService: CategoryService,
    private thaiMarketService: ThaiMarketService,
    private accountService: AccountService,
    private orderService: OrderService
  ) {
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.getThaiCategories();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (!currentUser || currentUser.role === ROLE.USER) {
      this.openDeliveryDialog();
    } 
    this.checkLogin();
    this.checkUpdatesLogin();
    this.loadBasket();
    this.updateBasket();
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
    this.dialog
      .open(DeliveryDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'dialog-inner',
        maxWidth: '750px',
        maxHeight: '550px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        this.deliveryType = result;
        this.orderService.deliveryType$.next(result);
      });
  }
  openResponseDialog(): void {
    this.dialog.open(ResponseComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      width: '750px',
      maxHeight: '690px',
    });
  }
  navigateToFavorite(): void {
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    if (user && user.role === ROLE.USER) {
      this.router.navigate(['/cabinet/favorite-products']);
    } else if (user && user.role === ROLE.ADMIN) {
      this.router.navigate(['/favorites']);
    } else {
      this.router.navigate(['/favorites']);
    }
  }
  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      maxWidth: '680px',
      maxHeight: '690px',
    });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    } else this.basket = [];
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }
  getTotalCount(): void{
    this.count = this.basket.reduce(
      (count: number, prod: IProductResponse) => count + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket$.subscribe(() => {
      this.loadBasket();
    });
  }
  openBasketDialog(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'dialog-back',
      width: '680px',
      maxWidth: '100vw',
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
  checkLogin(): void {
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    if (user) {
      this.isUser = true;
      this.userName = user.firstName;
    } else {
      this.isUser = false;
      this.userName = '';
    }
  }
  checkUpdatesLogin() {
    this.accountService.isLogin$.subscribe(() => {
      this.checkLogin();
    });
  }
  navigateTo(): void {
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    if (user && user.role === ROLE.USER) {
      this.router.navigate(['/cabinet']);
    } else if (user && user.role === ROLE.ADMIN) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
