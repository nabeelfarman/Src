import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDepreciationRatesTableComponent } from './inventory-depreciation-rates-table.component';

describe('InventoryDepreciationRatesTableComponent', () => {
  let component: InventoryDepreciationRatesTableComponent;
  let fixture: ComponentFixture<InventoryDepreciationRatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryDepreciationRatesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDepreciationRatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
