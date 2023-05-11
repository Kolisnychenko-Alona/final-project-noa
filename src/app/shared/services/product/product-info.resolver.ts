import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolver implements Resolve<DocumentData> {
  constructor(private productService: ProductService){};

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DocumentData> {
    return this.productService.getOne(route.paramMap.get('id') as string);
  }
}
