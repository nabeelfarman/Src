import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPurchaseComponent } from './inventory-purchase.component';

describe('InventoryPurchaseComponent', () => {
  let component: InventoryPurchaseComponent;
  let fixture: ComponentFixture<InventoryPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
