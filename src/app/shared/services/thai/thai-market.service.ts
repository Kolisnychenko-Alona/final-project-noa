import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interfaces/category/ICategory';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ThaiMarketService {
  private thaiCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.thaiCollection = collection(this.afs, 'thai-categories');
  }

  getAll() {
    return collectionData(this.thaiCollection, { idField: 'id' });
  }
  create(thaiCategory: ICategoryRequest) {
    return addDoc(this.thaiCollection, thaiCategory);
  }
  update(thaiCategory: ICategoryRequest, id: string) {
    const thaiDocumentReference = doc(this.afs, `thai-categories/${id}`);
    return updateDoc(thaiDocumentReference, { ...thaiCategory });
  }
  delete(id: string) {
    const thaiDocumentReference = doc(this.afs, `thai-categories/${id}`);
    return deleteDoc(thaiDocumentReference);
  }
}
