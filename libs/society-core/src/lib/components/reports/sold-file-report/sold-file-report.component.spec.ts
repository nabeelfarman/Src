import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldFileReportComponent } from './sold-file-report.component';

describe('SoldFileReportComponent', () => {
  let component: SoldFileReportComponent;
  let fixture: ComponentFixture<SoldFileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldFileReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldFileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
