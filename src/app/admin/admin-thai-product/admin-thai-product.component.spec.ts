import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThaiProductComponent } from './admin-thai-product.component';

describe('AdminThaiProductComponent', () => {
  let component: AdminThaiProductComponent;
  let fixture: ComponentFixture<AdminThaiProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminThaiProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThaiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
