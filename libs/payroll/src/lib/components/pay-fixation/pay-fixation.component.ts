import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-pay-fixation',
  templateUrl: './pay-fixation.component.html',
  styleUrls: ['./pay-fixation.component.scss'],
})
export class PayFixationComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Pay Fixation');
  }
}
