import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationBankStatementTableComponent } from './reconciliation-bank-statement-table.component';

describe('ReconciliationBankStatementTableComponent', () => {
  let component: ReconciliationBankStatementTableComponent;
  let fixture: ComponentFixture<ReconciliationBankStatementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationBankStatementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationBankStatementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
