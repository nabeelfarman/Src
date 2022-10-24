import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrcPaymentPlanComponent } from './src-payment-plan.component';

describe('SrcPaymentPlanComponent', () => {
  let component: SrcPaymentPlanComponent;
  let fixture: ComponentFixture<SrcPaymentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrcPaymentPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcPaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
