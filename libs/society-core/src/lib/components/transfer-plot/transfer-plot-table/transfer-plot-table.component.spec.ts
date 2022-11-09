import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPlotTableComponent } from './transfer-plot-table.component';

describe('TransferPlotTableComponent', () => {
  let component: TransferPlotTableComponent;
  let fixture: ComponentFixture<TransferPlotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPlotTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPlotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
