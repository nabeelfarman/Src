import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileReportComponent } from './customer-profile-report.component';

describe('CustomerProfileReportComponent', () => {
  let component: CustomerProfileReportComponent;
  let fixture: ComponentFixture<CustomerProfileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
