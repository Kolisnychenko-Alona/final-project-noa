import { Component, OnInit } from '@angular/core';
import { IRegister } from 'src/app/shared/interfaces/auth/IRegister';
import { IOrderRequest, IOrderResponse } from 'src/app/shared/interfaces/order/IOrder';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/orders/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  public orders: Array<IOrderResponse> = [];

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) { }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.orderService.getAll().subscribe((data) => {
      this.orders = data as IOrderResponse[];
    });
  }
  processOrder(status: string, order: IOrderResponse): void {
    let currentOrder = order;
    currentOrder.status = status;
    this.orderService.update(currentOrder, currentOrder.id).then(()=>{
      console.log('order modified', currentOrder.status)
    });
    if (currentOrder.userId) {
      let customer: IRegister;
      this.accountService.getOne(currentOrder.userId).subscribe(data => {
        customer = data as IRegister;
        console.log(customer);
        });
      // currentUser.orders[currentOrder.id].status = status;
      // this.accountService.update(currentUser, currentUser.uid)
      //   .then(() => {
      //     console.log( 'user order modified', currentUser[currentOrder.id].status)
      //   });
    }
    
  }
}
