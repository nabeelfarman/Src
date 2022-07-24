import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEstimateTableComponent } from './budget-estimate-table.component';

describe('BudgetEstimateTableComponent', () => {
  let component: BudgetEstimateTableComponent;
  let fixture: ComponentFixture<BudgetEstimateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEstimateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEstimateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
