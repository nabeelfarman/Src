import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionDetailComponent } from './land-acquisition-detail.component';

describe('LandAcquisitionDetailComponent', () => {
  let component: LandAcquisitionDetailComponent;
  let fixture: ComponentFixture<LandAcquisitionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
