import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/interfaces/order/IOrder';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public orders: Array<IOrderResponse> = [];

  constructor(
    private accountService: AccountService
  ) { }
  
  ngOnInit(): void {
    this.getOrders();
   }

  getOrders(): void{
    const user = JSON.parse(localStorage.getItem('currentUser') as string);
    if (localStorage.length > 0 && user) {
      const userID = user.uid;
      this.accountService.getOne(userID).subscribe(data => {
        this.orders = data['orders'];
        
      })
    }     
  }

}
