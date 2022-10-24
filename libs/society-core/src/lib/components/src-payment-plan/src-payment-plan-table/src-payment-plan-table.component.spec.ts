import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrcPaymentPlanTableComponent } from './src-payment-plan-table.component';

describe('SrcPaymentPlanTableComponent', () => {
  let component: SrcPaymentPlanTableComponent;
  let fixture: ComponentFixture<SrcPaymentPlanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrcPaymentPlanTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcPaymentPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
