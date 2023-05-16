import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketProductInfoComponent } from './market-product-info.component';

describe('MarketProductInfoComponent', () => {
  let component: MarketProductInfoComponent;
  let fixture: ComponentFixture<MarketProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketProductInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
