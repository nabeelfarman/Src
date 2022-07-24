import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-main-group',
  templateUrl: './main-group.component.html',
  styleUrls: ['./main-group.component.scss'],
})
export class MainGroupComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Mian Grouping');
  }

  save() {}

  reset() {}
}
