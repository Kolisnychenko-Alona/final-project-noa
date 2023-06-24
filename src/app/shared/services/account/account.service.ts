import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IRegister } from '../../interfaces/auth/IRegister';
 

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public isLogin$ = new Subject<boolean>();
  public isAdmin$ = new Subject<boolean>();
  public changeFavorites$ = new Subject<boolean>();

  constructor(private afs: Firestore) {
  }
  update(credential: IRegister, id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(userDocumentReference, { ...credential });
  }
  getOne(id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }
}
