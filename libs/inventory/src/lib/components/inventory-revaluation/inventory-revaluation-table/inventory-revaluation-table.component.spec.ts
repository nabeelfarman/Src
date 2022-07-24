import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRevaluationTableComponent } from './inventory-revaluation-table.component';

describe('InventoryRevaluationTableComponent', () => {
  let component: InventoryRevaluationTableComponent;
  let fixture: ComponentFixture<InventoryRevaluationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryRevaluationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRevaluationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
