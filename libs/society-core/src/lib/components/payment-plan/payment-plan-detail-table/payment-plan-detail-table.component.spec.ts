import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanDetailTableComponent } from './payment-plan-detail-table.component';

describe('PaymentPlanDetailTableComponent', () => {
  let component: PaymentPlanDetailTableComponent;
  let fixture: ComponentFixture<PaymentPlanDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
