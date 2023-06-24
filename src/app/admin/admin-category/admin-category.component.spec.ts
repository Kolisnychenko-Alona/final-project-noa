import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let categoryService: CategoryService;
  let fireStore: Firestore

  beforeEach(async () => {
    // categoryService = jasmine.createSpyObj('CategoryService');
    await TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: CategoryService, useValue: categoryService },
        ImageService,
      ],
    }).compileComponents();

    categoryService = TestBed.inject(CategoryService);
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
