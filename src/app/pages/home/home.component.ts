import { Component, OnInit} from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { OrderService } from 'src/app/shared/services/orders/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public more = false;

  constructor() {}
  ngOnInit(): void {}

  toggleMore(moreText: HTMLElement): void {
    this.more = !this.more;
    const moreTextWidth = moreText.scrollHeight + 'px';
    if (this.more) {
      moreText.style.height = moreTextWidth;
    } else if (!this.more) {
      moreText.style.height = '0';
    }
  }
  
}
