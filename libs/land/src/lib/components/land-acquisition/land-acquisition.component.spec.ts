import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionComponent } from './land-acquisition.component';

describe('LandAcquisitionComponent', () => {
  let component: LandAcquisitionComponent;
  let fixture: ComponentFixture<LandAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
