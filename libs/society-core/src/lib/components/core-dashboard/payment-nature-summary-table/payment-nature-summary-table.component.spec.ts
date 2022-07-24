import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNatureSummaryTableComponent } from './payment-nature-summary-table.component';

describe('PaymentNatureSummaryTableComponent', () => {
  let component: PaymentNatureSummaryTableComponent;
  let fixture: ComponentFixture<PaymentNatureSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentNatureSummaryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentNatureSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
