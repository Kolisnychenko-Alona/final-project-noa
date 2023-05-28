import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/order/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  private orderCollection!: CollectionReference<DocumentData>;

  public changeBasket = new Subject<boolean>();

  constructor(private afs: Firestore) {
    this.orderCollection = collection(this.afs, 'orders');
  }
  create(order: IOrderRequest) {
    return addDoc(this.orderCollection, order);
  }
}
