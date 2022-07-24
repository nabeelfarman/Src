import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'society-tax-section',
  templateUrl: './tax-section.component.html',
  styleUrls: ['./tax-section.component.scss'],
})
export class TaxSectionComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Tax Sections');
  }

  save() {}

  reset() {}
}
