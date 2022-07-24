import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherEntryTableComponent } from './voucher-entry-table.component';

describe('VoucherEntryTableComponent', () => {
  let component: VoucherEntryTableComponent;
  let fixture: ComponentFixture<VoucherEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherEntryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
