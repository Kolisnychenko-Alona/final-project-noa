import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThaiComponent } from './admin-thai.component';

describe('AdminThaiComponent', () => {
  let component: AdminThaiComponent;
  let fixture: ComponentFixture<AdminThaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminThaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
