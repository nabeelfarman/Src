import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotAllotmentTableComponent } from './plot-allotment-table.component';

describe('PlotAllotmentTableComponent', () => {
  let component: PlotAllotmentTableComponent;
  let fixture: ComponentFixture<PlotAllotmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotAllotmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotAllotmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
