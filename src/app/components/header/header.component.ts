import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public deliveryType: string = `Доставка кур'єром`;
  public total!: number;

  constructor() {}

  ngOnInit(): void {}

  openDeliveryDialog(): void {}
  openAuthDialog(): void {}
  openMenuDialog():void{}
}
