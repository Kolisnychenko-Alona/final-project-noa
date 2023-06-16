import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { AccountService } from 'src/app/shared/services/account/account.service';


import { OrderService } from 'src/app/shared/services/orders/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.scss'],
})
export class FavoriteProductsComponent implements OnInit {
  public userCategories: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductResponse> = [];
  public userThaiProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public currentCategory!: string;
  public filter = 'all';
  public sort = 'price up';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private accountService: AccountService,
    private productThaiService: ThaiProductService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
    this.updateProducts();
  }

  loadProducts(): void {
    let products: Array<IProductResponse> = [];
    let productsThai: Array<IProductResponse> = [];
    this.productService.getAll().subscribe((data) => {
      products = data as IProductResponse[];
      products = products.filter((product) => product.favorite === true);
      this.userProducts = products.concat(productsThai);
    });
    this.productThaiService.getAll().subscribe((data) => {
      productsThai = data as IProductResponse[];
      productsThai = productsThai.filter((product) => product.favorite === true);
      this.userProducts = products.concat(productsThai);
    });
    
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket$.next(true);
  }
  deleteFavoriteProduct(product: IProductResponse, id: string): void {
    product.favorite = false;
    this.productService.getOne(id).subscribe((data) => {
      if (data) {
        this.productService.update(product, id);
      }
    });
    this.productThaiService.getOne(id).subscribe((data) => {
      if (data) {
        this.productThaiService.update(product, id);
      }
    });
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    const index = favorites.findIndex(
      (prod: IProductResponse) => prod.id === product.id
    );
    if (index === 0) {
      favorites.shift();
      user.favorites.shift();
    } else if (index === favorites.length - 1) {
      favorites.pop();
      user.favorites.pop();
    } else {
      favorites.splice(1, index);
      user.favorites.splice(1, index);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.accountService.update(user, user.uid);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.accountService.changeFavorites$.next(true);
  }

  updateProducts(): void {
    this.accountService.changeFavorites$.subscribe(() => {
      this.loadProducts();
    });
  }
}
