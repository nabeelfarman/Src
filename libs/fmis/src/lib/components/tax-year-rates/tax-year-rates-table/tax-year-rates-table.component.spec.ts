import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxYearRatesTableComponent } from './tax-year-rates-table.component';

describe('TaxYearRatesTableComponent', () => {
  let component: TaxYearRatesTableComponent;
  let fixture: ComponentFixture<TaxYearRatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxYearRatesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxYearRatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
