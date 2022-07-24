import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-payroll-register',
  templateUrl: './payroll-register.component.html',
  styleUrls: ['./payroll-register.component.scss'],
})
export class PayrollRegisterComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Payroll Register');
  }
}
