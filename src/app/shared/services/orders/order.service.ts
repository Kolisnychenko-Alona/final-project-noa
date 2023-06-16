import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ReplaySubject, Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/order/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  private orderCollection!: CollectionReference<DocumentData>;

  public changeBasket$ = new Subject<boolean>();
  public deliveryType$ = new ReplaySubject<string>();

  constructor(private afs: Firestore) {
    this.orderCollection = collection(this.afs, 'orders');
  }
  getDeliveryType(): string{
    let delivery!: string;
      this.deliveryType$.subscribe(data => {
        delivery = data;
    })
    return delivery;
  }
  create(order: IOrderRequest) {
    return addDoc(this.orderCollection, order);
  }
}
