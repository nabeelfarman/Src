import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlotTableComponent } from './map-plot-table.component';

describe('MapPlotTableComponent', () => {
  let component: MapPlotTableComponent;
  let fixture: ComponentFixture<MapPlotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPlotTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
