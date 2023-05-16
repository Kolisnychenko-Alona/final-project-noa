import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { ThaiProductService } from './thai-product.service';

@Injectable({
  providedIn: 'root',
})
export class ThaiProductInfoResolver implements Resolve<DocumentData> {
  constructor(private thaiProductService: ThaiProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DocumentData> {
    return this.thaiProductService.getOne(route.paramMap.get('id') as string);
  }
}
