import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmisDashboardComponent } from './fmis-dashboard.component';

describe('FmisDashboardComponent', () => {
  let component: FmisDashboardComponent;
  let fixture: ComponentFixture<FmisDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmisDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
