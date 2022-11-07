import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentVoucherTableComponent } from './installment-voucher-table.component';

describe('InstallmentVoucherTableComponent', () => {
  let component: InstallmentVoucherTableComponent;
  let fixture: ComponentFixture<InstallmentVoucherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentVoucherTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentVoucherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
