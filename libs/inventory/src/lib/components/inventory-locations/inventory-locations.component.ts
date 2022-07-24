import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inventory-locations',
  templateUrl: './inventory-locations.component.html',
  styleUrls: ['./inventory-locations.component.scss'],
})
export class InventoryLocationsComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Invanetory Locations');
  }
}
