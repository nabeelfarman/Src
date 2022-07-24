import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPaymentsListComponent } from './voucher-payments-list.component';

describe('VoucherPaymentsListComponent', () => {
  let component: VoucherPaymentsListComponent;
  let fixture: ComponentFixture<VoucherPaymentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherPaymentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
