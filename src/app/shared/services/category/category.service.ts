import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interfaces/category/ICategory';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private categoryCollection!: CollectionReference<DocumentData>;

  constructor( private afs: Firestore) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAll() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }
  create(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }
  update(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }
  delete(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
