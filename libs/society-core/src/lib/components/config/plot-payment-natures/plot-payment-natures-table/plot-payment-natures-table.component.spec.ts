import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotPaymentNaturesTableComponent } from './plot-payment-natures-table.component';

describe('PlotPaymentNaturesTableComponent', () => {
  let component: PlotPaymentNaturesTableComponent;
  let fixture: ComponentFixture<PlotPaymentNaturesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotPaymentNaturesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotPaymentNaturesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
