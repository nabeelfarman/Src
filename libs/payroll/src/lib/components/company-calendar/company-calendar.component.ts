import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.scss'],
})
export class CompanyCalendarComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Time & Calendar');
  }
}
