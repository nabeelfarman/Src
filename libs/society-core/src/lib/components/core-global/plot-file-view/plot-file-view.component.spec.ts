import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotFileViewComponent } from './plot-file-view.component';

describe('PlotFileViewComponent', () => {
  let component: PlotFileViewComponent;
  let fixture: ComponentFixture<PlotFileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotFileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
