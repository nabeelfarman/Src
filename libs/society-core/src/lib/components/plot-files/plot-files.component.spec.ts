import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotFilesComponent } from './plot-files.component';

describe('PlotFilesComponent', () => {
  let component: PlotFilesComponent;
  let fixture: ComponentFixture<PlotFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
