import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmisScheduleTableComponent } from './fmis-schedule-table.component';

describe('FmisScheduleTableComponent', () => {
  let component: FmisScheduleTableComponent;
  let fixture: ComponentFixture<FmisScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmisScheduleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmisScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
