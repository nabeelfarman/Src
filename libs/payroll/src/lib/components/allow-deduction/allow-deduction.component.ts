import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-allow-deduction',
  templateUrl: './allow-deduction.component.html',
  styleUrls: ['./allow-deduction.component.scss'],
})
export class AllowDeductionComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Allowance / Deduction');
  }
}
