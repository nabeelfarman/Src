import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankReconciliationTableComponent } from './bank-reconciliation-table.component';

describe('BankReconciliationTableComponent', () => {
  let component: BankReconciliationTableComponent;
  let fixture: ComponentFixture<BankReconciliationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankReconciliationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankReconciliationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
