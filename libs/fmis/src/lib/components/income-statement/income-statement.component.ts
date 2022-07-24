import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.scss'],
})
export class IncomeStatementComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Income Statement');
  }
}
