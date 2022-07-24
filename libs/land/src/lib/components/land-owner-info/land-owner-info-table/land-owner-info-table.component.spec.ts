import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandOwnerInfoTableComponent } from './land-owner-info-table.component';

describe('LandOwnerInfoTableComponent', () => {
  let component: LandOwnerInfoTableComponent;
  let fixture: ComponentFixture<LandOwnerInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandOwnerInfoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandOwnerInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
