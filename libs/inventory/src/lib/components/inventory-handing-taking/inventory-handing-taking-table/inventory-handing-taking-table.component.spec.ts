import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHandingTakingTableComponent } from './inventory-handing-taking-table.component';

describe('InventoryHandingTakingTableComponent', () => {
  let component: InventoryHandingTakingTableComponent;
  let fixture: ComponentFixture<InventoryHandingTakingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryHandingTakingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHandingTakingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
