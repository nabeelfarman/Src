import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHandingTakingComponent } from './inventory-handing-taking.component';

describe('InventoryHandingTakingComponent', () => {
  let component: InventoryHandingTakingComponent;
  let fixture: ComponentFixture<InventoryHandingTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryHandingTakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHandingTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
