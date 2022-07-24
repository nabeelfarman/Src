import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHandingTakingItemListComponent } from './inventory-handing-taking-item-list.component';

describe('InventoryHandingTakingItemListComponent', () => {
  let component: InventoryHandingTakingItemListComponent;
  let fixture: ComponentFixture<InventoryHandingTakingItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryHandingTakingItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHandingTakingItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
