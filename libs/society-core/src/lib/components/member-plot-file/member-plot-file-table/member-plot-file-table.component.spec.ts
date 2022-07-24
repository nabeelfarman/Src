import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPlotFileTableComponent } from './member-plot-file-table.component';

describe('MemberPlotFileTableComponent', () => {
  let component: MemberPlotFileTableComponent;
  let fixture: ComponentFixture<MemberPlotFileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPlotFileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPlotFileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
