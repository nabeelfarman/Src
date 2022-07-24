import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemProfileComponent } from './inventory-item-profile.component';

describe('InventoryItemProfileComponent', () => {
  let component: InventoryItemProfileComponent;
  let fixture: ComponentFixture<InventoryItemProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
