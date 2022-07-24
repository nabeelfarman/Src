import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss'],
})
export class TrialBalanceComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Trial Balance Report');
  }
}
