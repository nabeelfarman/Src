import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotTypeComponent } from './plot-type.component';

describe('PlotTypeComponent', () => {
  let component: PlotTypeComponent;
  let fixture: ComponentFixture<PlotTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
