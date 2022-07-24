import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-desgination-bps',
  templateUrl: './desgination-bps.component.html',
  styleUrls: ['./desgination-bps.component.scss'],
})
export class DesginationBpsComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  bpsList = [
    {
      bps: 1,
    },
    {
      bps: 2,
    },
    {
      bps: 3,
    },
    {
      bps: 4,
    },
    {
      bps: 5,
    },
    {
      bps: 6,
    },
    {
      bps: 7,
    },
    {
      bps: 8,
    },
    {
      bps: 9,
    },
    {
      bps: 10,
    },
    {
      bps: 11,
    },
  ];
  ngOnInit(): void {
    this.global.setHeaderTitle('Designations');
  }

  save() {}

  reset() {}
}
