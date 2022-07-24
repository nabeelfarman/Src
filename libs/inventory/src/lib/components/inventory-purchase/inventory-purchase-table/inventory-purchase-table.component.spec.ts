import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPurchaseTableComponent } from './inventory-purchase-table.component';

describe('InventoryPurchaseTableComponent', () => {
  let component: InventoryPurchaseTableComponent;
  let fixture: ComponentFixture<InventoryPurchaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryPurchaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPurchaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
