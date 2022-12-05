import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBookSummaryPrintComponent } from './cash-book-summary-print.component';

describe('CashBookSummaryPrintComponent', () => {
  let component: CashBookSummaryPrintComponent;
  let fixture: ComponentFixture<CashBookSummaryPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBookSummaryPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBookSummaryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
