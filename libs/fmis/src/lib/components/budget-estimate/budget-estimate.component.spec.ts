import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEstimateComponent } from './budget-estimate.component';

describe('BudgetEstimateComponent', () => {
  let component: BudgetEstimateComponent;
  let fixture: ComponentFixture<BudgetEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
