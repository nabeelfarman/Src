import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-bank-reconciliation',
  templateUrl: './bank-reconciliation.component.html',
  styleUrls: ['./bank-reconciliation.component.scss'],
})
export class BankReconciliationComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Bank Reconciliation Statement');
  }
}
