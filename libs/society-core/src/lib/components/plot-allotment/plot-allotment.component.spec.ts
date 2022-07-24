import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotAllotmentComponent } from './plot-allotment.component';

describe('PlotAllotmentComponent', () => {
  let component: PlotAllotmentComponent;
  let fixture: ComponentFixture<PlotAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
