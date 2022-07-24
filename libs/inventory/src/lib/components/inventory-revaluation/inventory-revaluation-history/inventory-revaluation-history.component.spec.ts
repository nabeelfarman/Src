import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRevaluationHistoryComponent } from './inventory-revaluation-history.component';

describe('InventoryRevaluationHistoryComponent', () => {
  let component: InventoryRevaluationHistoryComponent;
  let fixture: ComponentFixture<InventoryRevaluationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryRevaluationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRevaluationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
