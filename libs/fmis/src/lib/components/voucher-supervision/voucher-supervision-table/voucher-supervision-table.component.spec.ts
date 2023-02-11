import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherSupervisionTableComponent } from './voucher-supervision-table.component';

describe('VoucherSupervisionTableComponent', () => {
  let component: VoucherSupervisionTableComponent;
  let fixture: ComponentFixture<VoucherSupervisionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherSupervisionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherSupervisionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
