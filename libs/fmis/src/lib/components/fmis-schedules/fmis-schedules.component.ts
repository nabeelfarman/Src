import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-fmis-schedules',
  templateUrl: './fmis-schedules.component.html',
  styleUrls: ['./fmis-schedules.component.scss'],
})
export class FmisSchedulesComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Accounting Schedules');
  }
}
