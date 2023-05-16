import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit, OnDestroy {
  public userThaiCategories: Array<ICategoryResponse> = [];
  public userThaiProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public currentCategory!: string;

  constructor(
    private thaiService: ThaiMarketService,
    private thaiProductService: ThaiProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router // private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.thaiService.getAll().subscribe((data) => {
      this.userThaiCategories = data as ICategoryResponse[];
    });
  }
  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    this.currentCategory = categoryName;
    let products: Array<IProductResponse> = [];
    this.thaiProductService.getAllByCategory(categoryName).then((data) => {
      data.forEach((doc) => {
        let product!: IProductResponse;
        product = doc.data() as IProductResponse;
        product.id = doc.id;
        products.push(product);
      });
      this.userThaiProducts = products;
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
    // let basket: Array<IProductResponse> = [];
    // if (localStorage.length > 0 && localStorage.getItem('basket')) {
    //   basket = JSON.parse(localStorage.getItem('basket') as string);
    //   if (basket.some((prod) => prod.id === product.id)) {
    //     const index = basket.findIndex((prod) => prod.id === product.id);
    //     basket[index].count += product.count;
    //   } else {
    //     basket.push(product);
    //   }
    // } else {
    //   basket.push(product);
    // }
    // localStorage.setItem('basket', JSON.stringify(basket));
    // product.count = 1;
    // this.orderService.changeBasket.next(true);
  }
  changeCategory(value: string) {
    this.router.navigate(['/market', value]);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
