import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherEntryBreakupComponent } from './voucher-entry-breakup.component';

describe('VoucherEntryBreakupComponent', () => {
  let component: VoucherEntryBreakupComponent;
  let fixture: ComponentFixture<VoucherEntryBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherEntryBreakupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherEntryBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
