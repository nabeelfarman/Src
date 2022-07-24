import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRevaluationComponent } from './inventory-revaluation.component';

describe('InventoryRevaluationComponent', () => {
  let component: InventoryRevaluationComponent;
  let fixture: ComponentFixture<InventoryRevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryRevaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
