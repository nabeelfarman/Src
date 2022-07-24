import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTransactionsComponent } from './payroll-transactions.component';

describe('PayrollTransactionsComponent', () => {
  let component: PayrollTransactionsComponent;
  let fixture: ComponentFixture<PayrollTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
