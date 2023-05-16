import { TestBed } from '@angular/core/testing';

import { ThaiProductInfoResolver } from './thai-product-info.resolver';

describe('ThaiProductInfoResolver', () => {
  let resolver: ThaiProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThaiProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
