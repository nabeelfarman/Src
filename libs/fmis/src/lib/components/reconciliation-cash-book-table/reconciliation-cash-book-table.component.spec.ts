import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationCashBookTableComponent } from './reconciliation-cash-book-table.component';

describe('ReconciliationCashBookTableComponent', () => {
  let component: ReconciliationCashBookTableComponent;
  let fixture: ComponentFixture<ReconciliationCashBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationCashBookTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationCashBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
