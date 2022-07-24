import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss'],
})
export class VendorProfileComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle("Vendor's Profile");
  }
}
