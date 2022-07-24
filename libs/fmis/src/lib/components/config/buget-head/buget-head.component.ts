import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-buget-head',
  templateUrl: './buget-head.component.html',
  styleUrls: ['./buget-head.component.scss'],
})
export class BugetHeadComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Budget Heads');
  }

  save() {}

  reset() {}
}
