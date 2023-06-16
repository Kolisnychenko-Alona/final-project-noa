import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favoriteProducts: Array<IProductResponse> = [];

  constructor(
    private productService: ProductService,
    private productThaiService: ThaiProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getFavoriteProducts();
  }

  getFavoriteProducts(): void {
    this.favoriteProducts = JSON.parse(
      localStorage.getItem('favorites') as string
    );
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
    // let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    const index = this.favoriteProducts.findIndex(
      (prod: IProductResponse) => prod.id === product.id
    );
    if (index === 0) {
      this.favoriteProducts.shift();
    } else if (index === this.favoriteProducts.length - 1) {
      this.favoriteProducts.pop();
    } else {
      this.favoriteProducts.splice(1, index);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favoriteProducts));
  }

  // updateProducts(): void {
  //   this.accountService.changeFavorites$.subscribe(() => {
  //     this.loadProducts();
  //   });
  // }
}
