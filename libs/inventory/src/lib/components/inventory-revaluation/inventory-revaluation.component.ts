import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inventory-revaluation',
  templateUrl: './inventory-revaluation.component.html',
  styleUrls: ['./inventory-revaluation.component.scss'],
})
export class InventoryRevaluationComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Inventory Revaluation');
  }
}
