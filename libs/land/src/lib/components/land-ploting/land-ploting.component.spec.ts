import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotingComponent } from './land-ploting.component';

describe('LandPlotingComponent', () => {
  let component: LandPlotingComponent;
  let fixture: ComponentFixture<LandPlotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPlotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
