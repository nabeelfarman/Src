import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { InstallmentVoucherReportComponent } from '../installment-voucher-report/installment-voucher-report.component';

@Component({
  selector: 'society-installment-voucher-table',
  templateUrl: './installment-voucher-table.component.html',
  styleUrls: ['./installment-voucher-table.component.scss'],
})
export class InstallmentVoucherTableComponent implements OnInit {
  @ViewChild(InstallmentVoucherReportComponent) installmentReport: any;

  tblSearch: any = '';

  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.getSavedInstallment();
  }

  getSavedInstallment() {
    this.dataService
      .getHttp('core-api/GetSavedInstallmentDetail', '')
      .subscribe(
        (response: any) => {
          this.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  printData(printSection: string, item: any) {
    // console.log(item);

    // if (item.invoiceDescription == '' || item.invoiceDescription == null) {
    //   item.invoiceDescription = '-';
    // }

    // if (item.bankReceiptNo == '' || item.bankReceiptNo == null) {
    //   item.bankReceiptNo = '-';
    // }

    this.installmentReport.lblInvoiceNo = item.invoiceNo;
    this.installmentReport.lblInvoiceDate = item.invoiceDate;
    this.installmentReport.lblFileName = item.fileName;
    this.installmentReport.lblOwnerName = item.partyName;
    this.installmentReport.lblAmount = item.amount;
    this.installmentReport.lblInstallmentType = item.installmentTypeName;
    this.installmentReport.lblPaymentNature = item.paymentNature;
    // this.installmentReport.lblBankReceipt = item.bankReceiptNo;
    // this.installmentReport.lblBankName = item.bankName;
    this.installmentReport.lblDescription = item.invoiceDescription;

    setTimeout(() => this.globalService.printData(printSection), 200);
  }
}
