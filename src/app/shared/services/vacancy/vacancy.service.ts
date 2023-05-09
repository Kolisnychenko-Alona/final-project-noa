import { Injectable } from '@angular/core';
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
import { IVacancyRequest } from '../../interfaces/vacancy/IVacancy';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private vacancyCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.vacancyCollection = collection(this.afs, 'vacancies');
  }

  getAll() {
    return collectionData(this.vacancyCollection, { idField: 'id' });
  }
  create(vacancy: IVacancyRequest) {
    return addDoc(this.vacancyCollection, vacancy);
  }
  update(vacancy: IVacancyRequest, id: string) {
    const vacancyDocumentReference = doc(this.afs, `vacancies/${id}`);
    return updateDoc(vacancyDocumentReference, { ...vacancy });
  }
  delete(id: string) {
    const vacancyDocumentReference = doc(this.afs, `vacancies/${id}`);
    return deleteDoc(vacancyDocumentReference);
  }
}
