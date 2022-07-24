import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDepreciationRatesComponent } from './inventory-depreciation-rates.component';

describe('InventoryDepreciationRatesComponent', () => {
  let component: InventoryDepreciationRatesComponent;
  let fixture: ComponentFixture<InventoryDepreciationRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryDepreciationRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDepreciationRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
