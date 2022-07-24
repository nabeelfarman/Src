import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAcquisitionPaymentsTableComponent } from './land-acquisition-payments-table.component';

describe('LandAcquisitionPaymentsTableComponent', () => {
  let component: LandAcquisitionPaymentsTableComponent;
  let fixture: ComponentFixture<LandAcquisitionPaymentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAcquisitionPaymentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAcquisitionPaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
