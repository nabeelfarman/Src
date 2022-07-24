import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-land-acquisition',
  templateUrl: './land-acquisition.component.html',
  styleUrls: ['./land-acquisition.component.scss'],
})
export class LandAcquisitionComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  rdbOption: number = 1;
  rdbLand = 1;

  ngOnInit(): void {
    this.global.setHeaderTitle('Land Acquisition');
  }

  onFileSelected(event: any) {}
}
