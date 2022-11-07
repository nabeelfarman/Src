import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPlotComponent } from './transfer-plot.component';

describe('TransferPlotComponent', () => {
  let component: TransferPlotComponent;
  let fixture: ComponentFixture<TransferPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
