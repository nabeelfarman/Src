import { Component, OnInit } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'society-voucher-payments-list',
  templateUrl: './voucher-payments-list.component.html',
  styleUrls: ['./voucher-payments-list.component.scss'],
})
export class VoucherPaymentsListComponent implements OnInit {
  constructor() {}

  public config: PerfectScrollbarConfigInterface = {};

  ngOnInit(): void {}
}
