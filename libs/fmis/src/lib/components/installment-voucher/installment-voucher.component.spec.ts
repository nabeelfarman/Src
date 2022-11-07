import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentVoucherComponent } from './installment-voucher.component';

describe('InstallmentVoucherComponent', () => {
  let component: InstallmentVoucherComponent;
  let fixture: ComponentFixture<InstallmentVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
