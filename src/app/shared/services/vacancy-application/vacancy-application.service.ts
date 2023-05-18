import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { IVacancyApplicationRequest } from '../../interfaces/vacancy-application/IVacancyApplication';

@Injectable({
  providedIn: 'root',
})
export class VacancyApplicationService {
  private vacancyApplicationCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.vacancyApplicationCollection = collection(
      this.afs,
      'vacancyApplications'
    );
  }
  getAll() {
    return collectionData(this.vacancyApplicationCollection, { idField: 'id' });
  }
  getOne(id: string) {
    const applicationDocumentReference = doc(
      this.afs,
      `vacancyApplications/${id}`
    );
    return docData(applicationDocumentReference, { idField: 'id' });
  }
  create(application: IVacancyApplicationRequest) {
    return addDoc(this.vacancyApplicationCollection, application);
  }
  update(application: IVacancyApplicationRequest, id: string) {
    const applicationDocumentReference = doc(
      this.afs,
      `vacancyApplications/${id}`
    );
    return updateDoc(applicationDocumentReference, { ...application });
  }
  delete(id: string) {
    const applicationDocumentReference = doc(
      this.afs,
      `vacancyApplications/${id}`
    );
    return deleteDoc(applicationDocumentReference);
  }
}
