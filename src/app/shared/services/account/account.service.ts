import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/user/IUser';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IRegister } from '../../interfaces/auth/IRegister';
 

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };
  public isLogin$ = new Subject<boolean>();
  public isAdmin$ = new Subject<boolean>();
  public changeFavorites$ = new Subject<boolean>();

  constructor(private http: HttpClient, private afs: Firestore) {
  }

  login(credential: IUser): Observable<any> {
    return this.http.get(
      `${this.api.auth}?email=${credential.email}&password=${credential.password}`
    );
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
