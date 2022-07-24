import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotNaturesComponent } from './plot-natures.component';

describe('PlotNaturesComponent', () => {
  let component: PlotNaturesComponent;
  let fixture: ComponentFixture<PlotNaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotNaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotNaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
