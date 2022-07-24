import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotTypeTableComponent } from './plot-type-table.component';

describe('PlotTypeTableComponent', () => {
  let component: PlotTypeTableComponent;
  let fixture: ComponentFixture<PlotTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
