import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-budget-estimate',
  templateUrl: './budget-estimate.component.html',
  styleUrls: ['./budget-estimate.component.scss'],
})
export class BudgetEstimateComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Budget Planning');
  }

  save() {}

  reset() {}
}
