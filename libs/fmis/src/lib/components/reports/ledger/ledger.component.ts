import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { LedgerInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { LedgerTableComponent } from './ledger-table/ledger-table.component';

@Component({
  selector: 'society-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  @ViewChild(LedgerTableComponent) ledgerTable: any;
  searchHead: any = '';

  lblDebit: any = 0;
  lblCredit: any = 0;
  lblBalance: any = 0;
  lblAccountHead: any = '';

  searchAccHead: any = '';

  cmbCOA: any = '';
  dtpFromDate: any = '';
  dtpToDate: any = '';

  // pageFields: LedgerInterface = {
  //   coaId: '0',
  //   userId: '',
  //   dtpFrom: '',
  //   dtpTo: '',
  // };

  // formFields: MyFormField[] = [
  //   {
  //     value: this.pageFields.coaId,
  //     msg: 'select head of account',
  //     type: 'selectBox',
  //     required: true,
  //   },
  //   {
  //     value: this.pageFields.userId,
  //     msg: '',
  //     type: 'hidden',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.dtpFrom,
  //     msg: 'select from date',
  //     type: 'date',
  //     required: true,
  //   },
  //   {
  //     value: this.pageFields.dtpTo,
  //     msg: 'select to date',
  //     type: 'date',
  //     required: true,
  //   },
  // ];

  coaList: any = [];

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Ledger Report');

    this.getChartOfAccount();
  }

  getChartOfAccount() {
    this.dataService.getHttp('core-api/getChartOfAccount', '').subscribe(
      (response: any) => {
        this.coaList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  showReport() {
    this.lblAccountHead = '';

    if (this.cmbCOA == '') {
      this.valid.apiInfoResponse('select head of account');
      return;
    } else if (this.dtpFromDate == '') {
      this.valid.apiInfoResponse('select from date');
      return;
    } else if (this.dtpToDate == '') {
      this.valid.apiInfoResponse('select to date');
      return;
    } else if (this.dtpFromDate > this.dtpToDate) {
      this.valid.apiInfoResponse('select correct from and to date');
      return;
    } else {
      var data = this.coaList.filter(
        (x: { coaID: any }) => x.coaID == this.cmbCOA
      );

      this.lblAccountHead = data[0].coaTitle;

      this.dataService
        .getHttp(
          'core-api/GetLedgerRpt?coaid=' +
            this.cmbCOA +
            '&fromdate=' +
            this.datePipe.transform(this.dtpFromDate, 'yyy-MM-dd') +
            '&todate=' +
            this.datePipe.transform(this.dtpToDate, 'yyy-MM-dd'),
          ''
        )
        .subscribe(
          (response: any) => {
            this.ledgerTable.tableData = response;
            this.lblDebit = 0;
            this.lblCredit = 0;
            this.lblBalance = 0;

            for (var i = 0; i < response.length; i++) {
              this.lblDebit += response[i].debit;
              this.lblCredit += response[i].credit;
              this.lblBalance += response[i].balance;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
  // save() {

  //   this.dataService
  //     .receivedtHttp(this.pageFields, this.formFields, 'fmis-api/Ledger/generateReport')
  //     .subscribe(
  //       (response: any) => {
  //         this.ledgerTable.tableData = JSON.parse(response);

  //         var debit: any = 0;
  //         var credit: any = 0;
  //         var opening: any = 0;

  //         for(var i=0; i<this.ledgerTable.tableData.length; i++){
  //           debit += parseInt(this.ledgerTable.tableData[i].Debit);
  //           credit += parseInt(this.ledgerTable.tableData[i].Credit);
  //           opening += parseInt(this.ledgerTable.tableData[i].Opening);
  //         }

  //         this.lblOpening = opening;
  //         this.lblPerodic = debit - credit;
  //         this.lblClosing = this.lblOpening - (-1 * this.lblPerodic);

  //       },
  //       (error: any) => {
  //         this.error = error;
  //         this.valid.apiErrorResponse(this.error);
  //       }
  //     );
  // }

  reset() {
    this.lblDebit = 0;
    this.lblCredit = 0;
    this.lblBalance = 0;
  }

  printData() {
    // console.log(item);return;
    if (this.ledgerTable.tableData.length == 0) {
      this.valid.apiInfoResponse('no data found');
      return;
    } else {
      setTimeout(() => this.globalService.printData('#print-summary'), 200);
    }
  }
}
