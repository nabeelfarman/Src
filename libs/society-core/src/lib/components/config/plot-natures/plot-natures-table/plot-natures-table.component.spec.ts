import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotNaturesTableComponent } from './plot-natures-table.component';

describe('PlotNaturesTableComponent', () => {
  let component: PlotNaturesTableComponent;
  let fixture: ComponentFixture<PlotNaturesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotNaturesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotNaturesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
