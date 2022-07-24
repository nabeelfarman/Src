import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-membership-payments-report',
  templateUrl: './membership-payments-report.component.html',
  styleUrls: ['./membership-payments-report.component.scss'],
})
export class MembershipPaymentsReportComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {
    this.global.setHeaderTitle('Membership Payment Report');
  }

  ngOnInit(): void {}

  printReport(printSection: string) {
    this.global.printData(printSection);
  }
}
