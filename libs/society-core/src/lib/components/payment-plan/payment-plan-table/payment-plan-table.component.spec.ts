import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanTableComponent } from './payment-plan-table.component';

describe('PaymentPlanTableComponent', () => {
  let component: PaymentPlanTableComponent;
  let fixture: ComponentFixture<PaymentPlanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
