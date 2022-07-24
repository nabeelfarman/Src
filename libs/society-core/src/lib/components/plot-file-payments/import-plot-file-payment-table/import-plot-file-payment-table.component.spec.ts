import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlotFilePaymentTableComponent } from './import-plot-file-payment-table.component';

describe('ImportPlotFilePaymentTableComponent', () => {
  let component: ImportPlotFilePaymentTableComponent;
  let fixture: ComponentFixture<ImportPlotFilePaymentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPlotFilePaymentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlotFilePaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
