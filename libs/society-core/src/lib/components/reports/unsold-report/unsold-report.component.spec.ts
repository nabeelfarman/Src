import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsoldReportComponent } from './unsold-report.component';

describe('UnsoldReportComponent', () => {
  let component: UnsoldReportComponent;
  let fixture: ComponentFixture<UnsoldReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsoldReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsoldReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
