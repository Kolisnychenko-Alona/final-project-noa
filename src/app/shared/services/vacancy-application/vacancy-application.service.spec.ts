import { TestBed } from '@angular/core/testing';

import { VacancyApplicationService } from './vacancy-application.service';

describe('VacancyApplicationService', () => {
  let service: VacancyApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
