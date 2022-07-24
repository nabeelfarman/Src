import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inventory-handing-taking',
  templateUrl: './inventory-handing-taking.component.html',
  styleUrls: ['./inventory-handing-taking.component.scss'],
})
export class InventoryHandingTakingComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  rdbHandingTaking: number = 0;
  pageHeading: string = '';

  ngOnInit(): void {
    this.global.setHeaderTitle('Handing / Taking');
    this.rdbHandingTaking = 1;
  }

  changePageHeading() {
    if (this.rdbHandingTaking == 1) {
      this.pageHeading = 'Handing';
    } else if (this.rdbHandingTaking == 2) {
      this.pageHeading = 'Taking';
    } else {
      this.pageHeading = 'Transfer';
    }
  }
}
