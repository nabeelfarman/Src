import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPaymentsReportComponent } from './membership-payments-report.component';

describe('MembershipPaymentsReportComponent', () => {
  let component: MembershipPaymentsReportComponent;
  let fixture: ComponentFixture<MembershipPaymentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPaymentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
