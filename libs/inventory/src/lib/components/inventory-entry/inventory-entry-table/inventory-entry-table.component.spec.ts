import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEntryTableComponent } from './inventory-entry-table.component';

describe('InventoryEntryTableComponent', () => {
  let component: InventoryEntryTableComponent;
  let fixture: ComponentFixture<InventoryEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEntryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
