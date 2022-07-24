import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionPaymentsDetailComponent } from './land-acquisition-payments-detail.component';

describe('LandAcquisitionPaymentsDetailComponent', () => {
  let component: LandAcquisitionPaymentsDetailComponent;
  let fixture: ComponentFixture<LandAcquisitionPaymentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionPaymentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionPaymentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
