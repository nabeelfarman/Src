import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotPaymentNaturesComponent } from './plot-payment-natures.component';

describe('PlotPaymentNaturesComponent', () => {
  let component: PlotPaymentNaturesComponent;
  let fixture: ComponentFixture<PlotPaymentNaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotPaymentNaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotPaymentNaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
