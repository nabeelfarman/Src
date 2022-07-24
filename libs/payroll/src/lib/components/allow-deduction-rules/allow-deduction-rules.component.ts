import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-allow-deduction-rules',
  templateUrl: './allow-deduction-rules.component.html',
  styleUrls: ['./allow-deduction-rules.component.scss'],
})
export class AllowDeductionRulesComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  rdbRule: string = '';

  ngOnInit(): void {
    this.global.setHeaderTitle('Payroll Rules');

    this.global.setHeaderTitle('Payroll Rules');
    this.rdbRule = '1';
  }
}
