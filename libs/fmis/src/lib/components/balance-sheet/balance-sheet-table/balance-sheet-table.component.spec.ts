import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetTableComponent } from './balance-sheet-table.component';

describe('BalanceSheetTableComponent', () => {
  let component: BalanceSheetTableComponent;
  let fixture: ComponentFixture<BalanceSheetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSheetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
