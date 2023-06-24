import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Firestore } from '@angular/fire/firestore';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOrdersComponent],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: {} },
        OrderService,
        AccountService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
