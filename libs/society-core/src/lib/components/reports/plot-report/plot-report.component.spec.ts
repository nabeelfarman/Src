import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotReportComponent } from './plot-report.component';

describe('PlotReportComponent', () => {
  let component: PlotReportComponent;
  let fixture: ComponentFixture<PlotReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
