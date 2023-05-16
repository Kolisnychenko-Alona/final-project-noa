import { TestBed } from '@angular/core/testing';

import { ThaiProductInfoService } from './thai-product-info.service';

describe('ThaiProductInfoService', () => {
  let service: ThaiProductInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThaiProductInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
