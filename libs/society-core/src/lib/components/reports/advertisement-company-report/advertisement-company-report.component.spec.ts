import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementCompanyReportComponent } from './advertisement-company-report.component';

describe('AdvertisementCompanyReportComponent', () => {
  let component: AdvertisementCompanyReportComponent;
  let fixture: ComponentFixture<AdvertisementCompanyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementCompanyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementCompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
