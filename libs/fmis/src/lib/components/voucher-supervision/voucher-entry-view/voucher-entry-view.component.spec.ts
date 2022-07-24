import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherEntryViewComponent } from './voucher-entry-view.component';

describe('VoucherEntryViewComponent', () => {
  let component: VoucherEntryViewComponent;
  let fixture: ComponentFixture<VoucherEntryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherEntryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
