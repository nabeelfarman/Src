import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotFilesTableComponent } from './plot-files-table.component';

describe('PlotFilesTableComponent', () => {
  let component: PlotFilesTableComponent;
  let fixture: ComponentFixture<PlotFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotFilesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
