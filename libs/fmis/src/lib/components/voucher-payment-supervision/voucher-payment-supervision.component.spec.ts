import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPaymentSupervisionComponent } from './voucher-payment-supervision.component';

describe('VoucherPaymentSupervisionComponent', () => {
  let component: VoucherPaymentSupervisionComponent;
  let fixture: ComponentFixture<VoucherPaymentSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherPaymentSupervisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPaymentSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
