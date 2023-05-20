import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public userCategories: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public currentCategory!: string;
  public filter = 'all';
  public sort = 'price up';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
// private orderService: OrderService
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
    this.categoryService.getAll().subscribe((data) => {
      this.userCategories = data as ICategoryResponse[];
    });
  }
  loadProducts(): void {
    let categoryName = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    if( !categoryName ){
      categoryName = 'culinasia-special';
    }
    this.currentCategory = categoryName;
    let products: Array<IProductResponse> = [];
    this.productService.getAllByCategory(categoryName).then((data) => {
      data.forEach((doc) => {
        let product!: IProductResponse;
        product = doc.data() as IProductResponse;
        product.id = doc.id;
        products.push(product);
      });
      let preProducts: Array<IProductResponse> = [];
      if (this.filter === 'all') {
        preProducts = products;
      } else if (this.filter === 'cul-special') {
        const filteredProducts = products.filter((product) => product.culSpecial === true);
        preProducts = filteredProducts;
      } else if (this.filter === 'no-rice') {
        const filteredProducts = products.filter((product) => product.noRise === true);
        preProducts = filteredProducts;
      }
      if (this.sort === 'price up') {
        preProducts.sort((a, b) => a.price - b.price);
      } else if (this.sort === 'price down') {
        preProducts.sort((a, b) => a.price - b.price).reverse();
      } else if (this.sort === 'weight up') {
        preProducts.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
      } else if (this.sort === 'weight down') {
        preProducts.sort((a, b) => parseInt(a.weight) - parseInt(b.weight)).reverse();
      }
        this.userProducts = preProducts;
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
    this.router.navigate(['/product', value]);
  }
  filtering(id: string) {
    this.filter = id;
    this.loadProducts();
  }
  sorting(value: string){
    this.sort = value;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
