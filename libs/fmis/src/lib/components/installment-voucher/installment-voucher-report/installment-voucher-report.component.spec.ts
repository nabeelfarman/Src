import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentVoucherReportComponent } from './installment-voucher-report.component';

describe('InstallmentVoucherReportComponent', () => {
  let component: InstallmentVoucherReportComponent;
  let fixture: ComponentFixture<InstallmentVoucherReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentVoucherReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentVoucherReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
