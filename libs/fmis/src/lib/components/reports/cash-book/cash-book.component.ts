import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { BankBalanceSummaryComponent } from './bank-balance-summary/bank-balance-summary.component';
import { CashBbokRptComponent } from './cash-bbok-rpt/cash-bbok-rpt.component';
import { CashBookSummaryPrintComponent } from './cash-book-summary-print/cash-book-summary-print.component';
declare var $: any;

@Component({
  selector: 'society-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.scss'],
})
export class CashBookComponent implements OnInit {

  @ViewChild(BankBalanceSummaryComponent) cashBookTable: any;
  @ViewChild(CashBookSummaryPrintComponent) cashBookPrintTable: any;
  @ViewChild(CashBbokRptComponent) cashBookDetTable: any;

  dtpFromDate: any = '';
  dtpToDate: any = '';
  lblCashBook: any = '';

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Cash Book Report');
  }

  showReport(){
    if(this.dtpFromDate == ''){
      this.valid.apiInfoResponse('select from date');
      return;
    }else if(this.dtpToDate == ''){
      this.valid.apiInfoResponse('select to date');
      return;
    }else if(this.dtpFromDate > this.dtpToDate){
      this.valid.apiInfoResponse('select correct from and to date');
      return;
    }else{
      this.dataService.getHttp('core-api/GetCashBookSummaryRpt?FromDate=' + this.datePipe.transform(this.dtpFromDate, 'yyy-MM-dd') + '&ToDate=' + this.datePipe.transform(this.dtpToDate, 'yyy-MM-dd'), '').subscribe((response: any) => {
        this.cashBookTable.tableData = response;
        this.cashBookPrintTable.tableData = response;
        
        this.cashBookTable.lblDebit = 0;
        this.cashBookTable.lblODebit = 0;
        this.cashBookTable.lblCDebit = 0;

        this.cashBookPrintTable.lblDebit = 0;
        this.cashBookPrintTable.lblODebit = 0;
        this.cashBookPrintTable.lblCDebit = 0;

        for(var i = 0; i < response.length; i++){
          this.cashBookTable.lblDebit += response[i].debit;
          this.cashBookTable.lblODebit += response[i].oDebit;
          this.cashBookTable.lblCDebit += response[i].cDebit;
          
          this.cashBookPrintTable.lblDebit += response[i].debit;
          this.cashBookPrintTable.lblODebit += response[i].oDebit;
          this.cashBookPrintTable.lblCDebit += response[i].cDebit;
        }
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  showDetail(item: any){

    this.lblCashBook = item.bankName;
    this.dataService.getHttp('core-api/GetCashBookDetailRpt?bankid=' + item.bankID + '&coaid=' + item.coaID + '&FromDate=' + this.datePipe.transform(this.dtpFromDate, 'yyy-MM-dd') + '&ToDate=' + this.datePipe.transform(this.dtpToDate, 'yyy-MM-dd'), '').subscribe((response: any) => {
      this.cashBookDetTable.tableData = response;
      this.cashBookDetTable.lblDebit = 0;
      this.cashBookDetTable.lblCredit = 0;

      $('#cashBookModal').modal('show');
      for(var i = 0; i < response.length; i++){
        this.cashBookDetTable.lblDebit += response[i].debit;
        this.cashBookDetTable.lblCredit += response[i].credit;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  
  printData() {
    if(this.cashBookTable.tableData.length == 0){
      this.valid.apiInfoResponse("no data found");return;
    }else{
      setTimeout(() => this.globalService.printData('#print-summary'), 200);
    }
    
  }
  
  printDetailData() {
    if(this.cashBookDetTable.tableData.length == 0){
      this.valid.apiInfoResponse("no data found");return;
    }else{
      setTimeout(() => this.globalService.printData('#print-detail-summary'), 200);
    }
    
  }

}
