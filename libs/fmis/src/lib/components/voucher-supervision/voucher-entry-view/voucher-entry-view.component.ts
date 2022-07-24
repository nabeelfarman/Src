import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-voucher-entry-view',
  templateUrl: './voucher-entry-view.component.html',
  styleUrls: ['./voucher-entry-view.component.scss']
})
export class VoucherEntryViewComponent implements OnInit {

  voucherNo: any = '';
  partyName: any = '';
  description: any = '';
  totalDebit: any = 0;
  totalCredit: any = 0;

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
