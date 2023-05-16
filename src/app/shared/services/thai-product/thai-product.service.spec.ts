import { TestBed } from '@angular/core/testing';

import { ThaiProductService } from './thai-product.service';

describe('ThaiProductService', () => {
  let service: ThaiProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThaiProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
