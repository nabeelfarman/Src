import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPurchaseItemTableComponent } from './inventory-purchase-item-table.component';

describe('InventoryPurchaseItemTableComponent', () => {
  let component: InventoryPurchaseItemTableComponent;
  let fixture: ComponentFixture<InventoryPurchaseItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryPurchaseItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPurchaseItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
