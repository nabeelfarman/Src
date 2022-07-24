import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss'],
})
export class SubGroupComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Sub Grouping');
  }

  save() {}

  reset() {}
}
