import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetHeadTableComponent } from './budget-head-table.component';

describe('BudgetHeadTableComponent', () => {
  let component: BudgetHeadTableComponent;
  let fixture: ComponentFixture<BudgetHeadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetHeadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetHeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
