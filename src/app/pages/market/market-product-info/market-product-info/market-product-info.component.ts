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
    private elementRef: ElementRef
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

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
