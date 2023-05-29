import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  public product!: IProductResponse;
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public slide = 0;
  public left = false;
  public right = true;
  public windowWidth!: number;
  public productWidth!: string;
  public koef!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private elementRef: ElementRef,
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
      this.product = response['productInfo'];
    });
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    this.changeProductWidth();
    let products: Array<IProductResponse> = [];
    this.productService.getAllByCategory(categoryName).then((data) => {
      data.forEach((doc) => {
        let product!: IProductResponse;
        product = doc.data() as IProductResponse;
        product.id = doc.id;
        products.push(product);
      });
      this.userProducts = products;
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
    this.orderService.changeBasket.next(true);
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
    this.slide === -productWidth * (this.userProducts.length - boxCount)
      ? (this.right = false)
      : (this.right = true);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
