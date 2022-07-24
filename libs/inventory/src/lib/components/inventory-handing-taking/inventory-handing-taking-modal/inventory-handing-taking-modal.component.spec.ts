import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHandingTakingModalComponent } from './inventory-handing-taking-modal.component';

describe('InventoryHandingTakingModalComponent', () => {
  let component: InventoryHandingTakingModalComponent;
  let fixture: ComponentFixture<InventoryHandingTakingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryHandingTakingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHandingTakingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
