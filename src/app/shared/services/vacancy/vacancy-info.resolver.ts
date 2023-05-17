import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VacancyService } from './vacancy.service';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class VacancyInfoResolver implements Resolve<DocumentData> {
  constructor(private vacancyService: VacancyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DocumentData> {
    return this.vacancyService.getOne(route.paramMap.get('id') as string);
  }
}
