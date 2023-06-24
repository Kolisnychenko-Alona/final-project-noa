import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { Firestore } from '@angular/fire/firestore';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
        { provide: Firestore, useValue: {} },
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
