import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-dialog',
  templateUrl: './delivery-dialog.component.html',
  styleUrls: ['./delivery-dialog.component.scss']
})
export class DeliveryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeliveryDialogComponent>
  ) { }
  
  ngOnInit(): void {    
  }

  changeDelivery(value: boolean): void{
    let deliveryType!: string;
    if (value) {
      deliveryType = "Доставка кур'єром";
    } else {
      deliveryType = "Самовивіз";
    }
    this.dialogRef.close(deliveryType)
   }
  
}
