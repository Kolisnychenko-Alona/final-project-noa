import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';
import { ProductService } from '../shared/services/product/product.service';
import { ThaiProductService } from '../shared/services/thai-product/thai-product.service';
import { OrderService } from '../shared/services/orders/order.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useValue: {} },
        { provide: AccountService, useValue: {} },
        { provide: ProductService, useValue: {} },
        { provide: ThaiProductService, useValue: {} },
        { provide: OrderService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
