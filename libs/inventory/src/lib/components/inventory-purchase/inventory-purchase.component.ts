import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inventory-purchase',
  templateUrl: './inventory-purchase.component.html',
  styleUrls: ['./inventory-purchase.component.scss'],
})
export class InventoryPurchaseComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Inventory Purchase Form');
  }
}
