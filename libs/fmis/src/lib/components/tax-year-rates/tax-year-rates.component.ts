import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-tax-year-rates',
  templateUrl: './tax-year-rates.component.html',
  styleUrls: ['./tax-year-rates.component.scss'],
})
export class TaxYearRatesComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Tax Year Rates');
  }
}
