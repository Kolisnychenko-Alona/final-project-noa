import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { IResponse } from '../../interfaces/response/IResponse';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  private responseCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.responseCollection = collection(this.afs, 'responses');
  }
  create(response: IResponse) {
    return addDoc(this.responseCollection, response);
  }
  getAll() {
    return collectionData(this.responseCollection, { idField: 'id' });
  }
}
