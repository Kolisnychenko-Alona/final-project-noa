import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDialogComponent } from './market-dialog.component';

describe('MarketDialogComponent', () => {
  let component: MarketDialogComponent;
  let fixture: ComponentFixture<MarketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
