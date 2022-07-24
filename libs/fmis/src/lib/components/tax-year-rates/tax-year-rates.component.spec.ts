import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxYearRatesComponent } from './tax-year-rates.component';

describe('TaxYearRatesComponent', () => {
  let component: TaxYearRatesComponent;
  let fixture: ComponentFixture<TaxYearRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxYearRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxYearRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
