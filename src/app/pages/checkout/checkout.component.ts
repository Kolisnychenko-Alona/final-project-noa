import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/orders/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit{
  public pickup!: boolean;
  public delivery!: boolean;
  public deliveryType!: string;
  public atTime = false;
  public withoutCutlery = false;
  public withoutChange = false;
  public cash = true;
  public liqPay = false;
  public comment = false;
  public total = 0;
  public cutleryNumber = 0;
  public orderForm!: FormGroup;
  public date!: string;

  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService
    ) {
    const currentDate = new Date();
    this.date = currentDate.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initForm();
    this.changeDeliveryType();
    this.orderService.deliveryType$.subscribe(data=>{
      this.deliveryType = data;
    })
  }
  changeDeliveryType(): void {
    this.orderService.deliveryType$.subscribe((data) => {
      this.deliveryType = data;
      if (this.deliveryType === 'Самовивіз') {
        this.pickup = true;
        this.delivery = false;
      } else if ((this.deliveryType === "Доставка кур'єром")) {
        this.pickup = false;
        this.delivery = true;
      }
      this.initForm();
    });
  }
  initForm(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      this.orderForm = this.fb.group({
        basket: [this.basket, Validators.required],
        firstName: [user.firstName, Validators.required],
        secondName: [user.lastName, Validators.required],
        phone: [user.phone, Validators.required],
        email: [user.email],
        deliveryType: [this.deliveryType, Validators.required],
        place: ['Виберіть ресторан'],
        date: [this.date],
        time: [null],
        city: [
          user.address.length > 0 ? user.address[0].city : 'Виберіть місто',
        ],
        street: [user.address.length > 0 ? user.address[0].street : null],
        houseNumber: [
          user.address.length > 0 ? user.address[0].houseNumber : null,
        ],
        entrance: [user.address.length > 0 ? user.address[0].entrance : null],
        flat: [user.address.length > 0 ? user.address[0].flat : null],
        flor: [user.address.length > 0 ? user.address[0].flor : null],
        cod: [user.address.length > 0 ? user.address[0].cod : null],
        cutleryCount: [this.cutleryNumber],
        payment: ['cash', Validators.required],
        change: [null],
        banknote: [null],
        callMe: [null],
        comment: [null],
        total: [this.total],
        status: [false],
        atTime: [false]
      });
    } else {
      this.orderForm = this.fb.group({
        basket: [this.basket, Validators.required],
        firstName: [null, Validators.required],
        secondName: [null, Validators.required],
        phone: [null, Validators.required],
        email: [null],
        deliveryType: [this.deliveryType, Validators.required],
        place: ['Виберіть ресторан'],
        date: [this.date],
        time: [null],
        city: ['Виберіть місто'],
        street: [null],
        houseNumber: [null],
        entrance: [null],
        flat: [null],
        flor: [null],
        cod: [null],
        cutleryCount: [this.cutleryNumber],
        payment: ['cash', Validators.required],
        change: [null],
        banknote: [null],
        callMe: [null],
        comment: [null],
        total: [this.total],
        status: [false],
        atTime: [false]
      });
    }
    this.checkDelivery();
  }
  checkDelivery(): void {
    let delivery!: string;
    this.orderService.deliveryType$.subscribe((deliveryType) => {
      if (deliveryType === "Доставка кур'єром") {
        delivery = deliveryType;
        this.orderForm.get('city')?.setValidators([Validators.required]);
        this.orderForm.get('street')?.setValidators([Validators.required]);
        this.orderForm.get('houseNumber')?.setValidators([Validators.required]);
        this.orderForm.get('place')?.clearValidators(); 
      } else if (deliveryType === 'Самовивіз') {
        this.orderForm.get('city')?.clearValidators();
        this.orderForm.get('street')?.clearValidators();
        this.orderForm.get('houseNumber')?.clearValidators();
        this.orderForm.get('place')?.setValidators([Validators.required]);
        this.orderForm.get('time')?.setValidators([Validators.required]);
      }
      this.orderForm.get('city')?.updateValueAndValidity();
      this.orderForm.get('street')?.updateValueAndValidity();
      this.orderForm.get('houseNumber')?.updateValueAndValidity();
      this.orderForm.get('place')?.updateValueAndValidity();
      this.orderForm.get('time')?.updateValueAndValidity();
    });
    this.orderForm.get('atTime')?.valueChanges.subscribe((atTime) => {
      if (delivery === "Доставка кур'єром" && atTime) {
        this.orderForm.get('time')?.setValidators([Validators.required]);
      } else {
        this.orderForm.get('time')?.clearValidators();
      }
      this.orderForm.get('time')?.updateValueAndValidity();
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
    this.orderService.changeBasket$.subscribe(() => {
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
    this.orderService.changeBasket$.next(true);
  }
  cutleryCount(value: boolean): void {
    if (value) {
      ++this.cutleryNumber;
    } else if (!value && this.cutleryNumber > 0) {
      --this.cutleryNumber;
    }
    this.orderForm.get('cutleryCount')?.setValue(this.cutleryNumber);
  }
  changePayment(): void {
    const controlValue = this.orderForm.get('payment')?.value;
    if (controlValue === 'cash') {
      this.cash = true;
      this.liqPay = false;
    } else if (controlValue === 'liqPay') {
      this.liqPay = true;
      this.cash = false;
    }
  }
  sendOrder(): void {
    this.orderService.create(this.orderForm.value).then(() => {
      localStorage.removeItem('basket');
      this.orderService.changeBasket$.next(true);
      this.toastr.success('Замовлення успіно оформлено! Наш менеджер зконтактує з Вами.');
      if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
        let user = JSON.parse(localStorage.getItem('currentUser') as string);
        const order = this.orderForm.value;
        user.orders.push(order);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.accountService.update(user, user.uid);
      }
      this.orderForm.reset();
      this.orderForm.get('cutleryCount')?.setValue(this.cutleryNumber);
      this.orderForm.get('deliveryType')?.setValue(this.deliveryType);
      this.orderForm.get('place')?.setValue('Виберіть ресторан');
      this.orderForm.get('city')?.setValue('Виберіть місто');
      this.orderForm.get('payment')?.setValue('cash');
      this.orderForm.get('total')?.setValue(this.total);
      this.router.navigate(['/home']);
    });

  }
}
