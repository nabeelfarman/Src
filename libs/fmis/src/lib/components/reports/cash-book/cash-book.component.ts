import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.scss'],
})
export class CashBookComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Bank / Cash Balance Report');
  }
}
