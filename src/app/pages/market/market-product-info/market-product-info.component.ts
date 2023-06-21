import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';

@Component({
  selector: 'app-market-product-info',
  templateUrl: './market-product-info.component.html',
  styleUrls: ['./market-product-info.component.scss'],
})
export class MarketProductInfoComponent implements OnInit, OnDestroy {
  public thaiProduct!: IProductResponse;
  public userThaiProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public slide = 0;
  public left = false;
  public right = false;
  public windowWidth!: number;
  public productWidth!: string;
  public koef!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private thaiProductService: ThaiProductService,
    private router: Router,
    private elementRef: ElementRef,
    private accountService: AccountService,
    private orderService: OrderService
  ) {
    this.windowWidth = window.innerWidth;
    this.findKoef();
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.findKoef();
    this.changeProductWidth();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.thaiProduct = response['thaiProductInfo'];
    });
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    this.changeProductWidth();
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
  quickOrder(product: IProductResponse): void {
    this.addToBasket(product);
    this.router.navigate(['/checkout']);
  }

  findKoef(): void {
    if (this.windowWidth <= 1400 && this.windowWidth > 990) {
      this.koef = 0.33;
    } else if (this.windowWidth <= 990) {
      this.koef = 0.5;
    } else if (this.windowWidth > 1400) {
      this.koef = 0.25;
    }
  }
  changeProductWidth(): void {
    const swiperWidth =
      this.elementRef.nativeElement.querySelector('.inner').clientWidth;
    this.productWidth = `${swiperWidth * this.koef}px`;
  }

  slideProduct(value: boolean, child: HTMLElement): void {
    const product = this.elementRef.nativeElement.querySelector('.product');
    const productWidth = product?.clientWidth;
    let boxCount!: number;
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 1400 && this.windowWidth > 990) {
      boxCount = 3;
    } else if (this.windowWidth <= 990) {
      boxCount = 2;
    } else if (this.windowWidth > 1400) {
      boxCount = 4;
    }
    if (value) {
      this.slide -= productWidth;
    } else {
      this.slide += productWidth;
    }
    child.style.transform = 'translateX(' + this.slide + 'px)';
    this.slide === 0 ? (this.left = false) : (this.left = true);
    this.slide === -productWidth * (this.userThaiProducts.length - boxCount)
      ? (this.right = false)
      : (this.right = true);
  }

  changeFavorite(): void {
    this.thaiProduct.favorite = !this.thaiProduct.favorite;
    this.thaiProductService.update(this.thaiProduct, this.thaiProduct.id);
    let user = JSON.parse(localStorage.getItem('currentUser') as string);
    let favorites: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage.getItem('favorites') as string);
      if (this.thaiProduct.favorite) {
        favorites.push(this.thaiProduct);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (user) {
          user.favorites.push(this.thaiProduct);
          this.accountService.update(user, user.uid);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      } else if (!this.thaiProduct.favorite) {
        const index = favorites.findIndex(
          (prod) => prod.id === this.thaiProduct.id
        );
        if (index === 0) {
          favorites.shift();
        } else if (index === favorites.length - 1) {
          favorites.pop();
        } else {
          favorites.splice(1, index);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (user) {
          if (index === 0) {
            user.favorites.shift();
          } else if (index === favorites.length - 1) {
            user.favorites.pop();
          } else {
            user.favorites.splice(1, index);
          }
          this.accountService.update(user, user.uid);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
    } else {
      favorites.push(this.thaiProduct);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      if (user) {
        user.favorites.push(this.thaiProduct);
        this.accountService.update(user, user.uid);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }
    this.accountService.changeFavorites$.next(true);
  }
  updateProducts(): void {
    this.accountService.changeFavorites$.subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
