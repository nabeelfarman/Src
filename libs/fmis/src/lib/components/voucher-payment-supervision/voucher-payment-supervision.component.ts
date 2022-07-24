import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'society-voucher-payment-supervision',
  templateUrl: './voucher-payment-supervision.component.html',
  styleUrls: ['./voucher-payment-supervision.component.scss'],
})
export class VoucherPaymentSupervisionComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  public config: PerfectScrollbarConfigInterface = {};

  ngOnInit(): void {
    this.global.setHeaderTitle('Voucher Payment / Supervision');
  }
}
