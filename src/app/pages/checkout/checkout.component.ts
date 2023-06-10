import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { OrderService } from 'src/app/shared/services/orders/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public pickup!: boolean;
  public delivery!: boolean;
  public atTime = false;
  public withoutCutlery = false;
  public cash = true;
  public liqPay = false;
  public comment = false;
  public total = 0;
  public cutleryNumber = 1;

  public basket: Array<IProductResponse> = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.orderService.deliveryType.subscribe((data) => {
      if (data === 'Самовивіз') {
        this.pickup = true;
        this.delivery = false;
      } else if ((data = "Доставка кур'єром")) {
        this.pickup = false;
        this.delivery = true;
      }
    });
  }
  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    } else this.basket = [];
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice();
  }
  deleteProduct(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (basket.some((prod) => prod.id === product.id)) {
      const index = basket.findIndex((prod) => prod.id === product.id);
      if (index === 0) {
        basket.shift();
      } else if (index === basket.length - 1) {
        basket.pop();
      } else {
        basket.splice(1, index);
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
  cutleryCount(value: boolean): void {
    if (value) {
      ++this.cutleryNumber;
    } else if (!value && this.cutleryNumber > 0) {
      --this.cutleryNumber;
    }
    this.getTotalPrice();
  }
  changePayment(payment: string): void{
    if(payment === 'cash'){
      this.cash = true;
      this.liqPay = false;
    } else if(payment = 'liqPay'){
      this.liqPay = true;
      this.cash = false;
    }
  }
}
