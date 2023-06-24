import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdressComponent } from './add-adress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddAdressComponent', () => {
  let component: AddAdressComponent;
  let fixture: ComponentFixture<AddAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdressComponent],
      imports: [FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should initialize the addressForm', () => {
     expect(component.addressForm).toBeDefined();
     expect(component.addressForm.get('city')).toBeDefined();
     expect(component.addressForm.get('street')).toBeDefined();
     expect(component.addressForm.get('house')).toBeDefined();
     expect(component.addressForm.get('apartment')).toBeDefined();
     expect(component.addressForm.get('entrance')).toBeDefined();
     expect(component.addressForm.get('flor')).toBeDefined();
     expect(component.addressForm.get('cod')).toBeDefined();
   });
});
