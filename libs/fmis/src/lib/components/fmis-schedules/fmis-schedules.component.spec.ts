import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmisSchedulesComponent } from './fmis-schedules.component';

describe('FmisSchedulesComponent', () => {
  let component: FmisSchedulesComponent;
  let fixture: ComponentFixture<FmisSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmisSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmisSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
