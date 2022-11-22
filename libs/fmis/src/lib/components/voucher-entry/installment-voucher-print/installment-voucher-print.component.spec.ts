import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentVoucherPrintComponent } from './installment-voucher-print.component';

describe('InstallmentVoucherPrintComponent', () => {
  let component: InstallmentVoucherPrintComponent;
  let fixture: ComponentFixture<InstallmentVoucherPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentVoucherPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentVoucherPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
