import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-installment-voucher-report',
  templateUrl: './installment-voucher-report.component.html',
  styleUrls: ['./installment-voucher-report.component.scss'],
})
export class InstallmentVoucherReportComponent implements OnInit {
  lblInvoiceNo: any = '';
  lblInvoiceDate: any = '';
  lblFileName: any = '';
  lblOwnerName: any = '';
  lblAmount: any = '';
  lblPaymentNature: any = '';
  lblInstallmentType: any = '';
  lblBankReceipt: any = '';
  lblBankName: any = '';
  lblDescription: any = '';
  lblCoaTitle: any = '';

  constructor() {}

  ngOnInit(): void {}
}
