import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryComponent } from 'src/app/pages/delivery/delivery.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public deliveryType: string = `Доставка кур'єром`;
  public total!: number;
  public isOpenMenu = false;
  public isDown = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDeliveryDialog(): void {
    this.dialog.open(DeliveryComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'dialog-inner',
      width: '750px',
      height: '425px',
      // disableClose: true
    });
  }
  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      minWidth: '380px',
      height: '200px',
    });
  }
  
  down(btn: HTMLElement): void{
    btn.classList.add('down');
  }
  up(btn: HTMLElement): void{
    btn.classList.remove('down');
  }
}
