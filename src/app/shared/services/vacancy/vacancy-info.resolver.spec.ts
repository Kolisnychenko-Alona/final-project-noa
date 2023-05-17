import { TestBed } from '@angular/core/testing';

import { VacancyInfoResolver } from './vacancy-info.resolver';

describe('VacancyInfoResolver', () => {
  let resolver: VacancyInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VacancyInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
