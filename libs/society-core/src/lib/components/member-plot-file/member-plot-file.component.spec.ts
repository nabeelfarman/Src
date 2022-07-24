import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPlotFileComponent } from './member-plot-file.component';

describe('MemberPlotFileComponent', () => {
  let component: MemberPlotFileComponent;
  let fixture: ComponentFixture<MemberPlotFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPlotFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPlotFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
