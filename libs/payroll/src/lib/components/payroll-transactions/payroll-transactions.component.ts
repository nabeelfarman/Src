import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-payroll-transactions',
  templateUrl: './payroll-transactions.component.html',
  styleUrls: ['./payroll-transactions.component.scss'],
})
export class PayrollTransactionsComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Payroll Transactions');
  }
}
