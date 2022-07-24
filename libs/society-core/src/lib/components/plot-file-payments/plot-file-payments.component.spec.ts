import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotFilePaymentsComponent } from './plot-file-payments.component';

describe('PlotFilePaymentsComponent', () => {
  let component: PlotFilePaymentsComponent;
  let fixture: ComponentFixture<PlotFilePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotFilePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotFilePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
