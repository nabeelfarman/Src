import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-installment-voucher-print',
  templateUrl: './installment-voucher-print.component.html',
  styleUrls: ['./installment-voucher-print.component.scss'],
})
export class InstallmentVoucherPrintComponent implements OnInit {
  lblInvoiceNo: any = '';
  lblVoucherType: any = '';
  lblVoucherDate: any = '';
  lblAccountType: any = '';
  lblProject: any = '';
  lblBank: any = '';
  lblBankReceipt: any = '';
  lblParty: any = '';

  lblDebit: any = 0;
  lblCredit: any = 0;

  tableData: any = [];

  lblDescription: any = '';

  constructor() {}

  ngOnInit(): void {}
}
