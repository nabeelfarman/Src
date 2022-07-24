import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPaymentsComponent } from './voucher-payments.component';

describe('VoucherPaymentsComponent', () => {
  let component: VoucherPaymentsComponent;
  let fixture: ComponentFixture<VoucherPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
