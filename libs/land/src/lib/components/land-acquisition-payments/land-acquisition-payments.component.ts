import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-land-acquisition-payments',
  templateUrl: './land-acquisition-payments.component.html',
  styleUrls: ['./land-acquisition-payments.component.scss'],
})
export class LandAcquisitionPaymentsComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Land Payments');
  }
}
