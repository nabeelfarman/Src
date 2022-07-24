import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionTableComponent } from './land-acquisition-table.component';

describe('LandAcquisitionTableComponent', () => {
  let component: LandAcquisitionTableComponent;
  let fixture: ComponentFixture<LandAcquisitionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
