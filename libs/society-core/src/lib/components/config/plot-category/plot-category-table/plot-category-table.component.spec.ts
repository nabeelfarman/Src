import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotCategoryTableComponent } from './plot-category-table.component';

describe('PlotCategoryTableComponent', () => {
  let component: PlotCategoryTableComponent;
  let fixture: ComponentFixture<PlotCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
