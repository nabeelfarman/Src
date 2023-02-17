import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingInstallmentReportComponent } from './remaining-installment-report.component';

describe('RemainingInstallmentReportComponent', () => {
  let component: RemainingInstallmentReportComponent;
  let fixture: ComponentFixture<RemainingInstallmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemainingInstallmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainingInstallmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
