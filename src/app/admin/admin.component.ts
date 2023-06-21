import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';
import { ProductService } from '../shared/services/product/product.service';
import { IProductResponse } from '../shared/interfaces/product/iproduct';
import { ThaiProductService } from '../shared/services/thai-product/thai-product.service';
import { OrderService } from '../shared/services/orders/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private productService: ProductService,
    private thaiService: ThaiProductService, 
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}
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
    this.orderService.changeBasket$.next(true);
  }
}
