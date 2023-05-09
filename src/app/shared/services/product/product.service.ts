import { Injectable } from '@angular/core';
import { IProductRequest } from '../../interfaces/product/iproduct';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getAllByCategory(name: string) {
    return getDocs(
      query(this.productCollection, where('category.path', '==', name))
    );
  }

  getOne(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  create(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  update(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, { ...product });
  }

  delete(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
