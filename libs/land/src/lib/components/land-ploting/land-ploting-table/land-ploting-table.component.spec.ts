import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotingTableComponent } from './land-ploting-table.component';

describe('LandPlotingTableComponent', () => {
  let component: LandPlotingTableComponent;
  let fixture: ComponentFixture<LandPlotingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPlotingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
