import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTransactionsEntryComponent } from './payroll-transactions-entry.component';

describe('PayrollTransactionsEntryComponent', () => {
  let component: PayrollTransactionsEntryComponent;
  let fixture: ComponentFixture<PayrollTransactionsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollTransactionsEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTransactionsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
