import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionPaymentsComponent } from './land-acquisition-payments.component';

describe('LandAcquisitionPaymentsComponent', () => {
  let component: LandAcquisitionPaymentsComponent;
  let fixture: ComponentFixture<LandAcquisitionPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
