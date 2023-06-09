import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
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

  create(order: IOrderRequest) {
    return addDoc(this.orderCollection, order);
  }
  getAll() {
    return collectionData(this.orderCollection, { idField: 'id' });
  }
  update(order: IOrderRequest, id: string) {
    const orderDocumentReference = doc(this.afs, `orders/${id}`);
    return updateDoc(orderDocumentReference, { ...order });
  }
}
