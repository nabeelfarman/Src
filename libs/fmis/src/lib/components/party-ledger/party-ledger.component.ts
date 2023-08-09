import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PartyLedgerTableComponent } from './party-ledger-table/party-ledger-table.component';

@Component({
  selector: 'society-party-ledger',
  templateUrl: './party-ledger.component.html',
  styleUrls: ['./party-ledger.component.scss'],
})
export class PartyLedgerComponent implements OnInit {
  @ViewChild(PartyLedgerTableComponent) partyLedgerTable: any;

  searchParty: any = '';
  searchHead: any = '';

  lblDebit: any = 0;
  lblCredit: any = 0;
  lblBalance: any = 0;
  lblAccountHead: any = '';

  searchAccHead: any = '';

  cmbParty: any = '';
  cmbCOA: any = '';
  dtpFromDate: any = '';
  dtpToDate: any = '';

  coaList: any = [];
  partyList: any = [];

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Party Ledger Report');

    this.getChartOfAccount();
    this.getParty();
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

  getParty() {
    this.dataService.getHttp('core-api/getChartOfAccount', '').subscribe(
      (response: any) => {
        this.partyList = response;
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
    } else if (this.cmbParty == '') {
      this.valid.apiInfoResponse('select party');
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
            '&partyID=' +
            this.cmbParty +
            '&fromdate=' +
            this.datePipe.transform(this.dtpFromDate, 'yyy-MM-dd') +
            '&todate=' +
            this.datePipe.transform(this.dtpToDate, 'yyy-MM-dd'),
          ''
        )
        .subscribe(
          (response: any) => {
            this.partyLedgerTable.tableData = response;
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

  printData() {
    // console.log(item);return;
    if (this.partyLedgerTable.tableData.length == 0) {
      this.valid.apiInfoResponse('no data found');
      return;
    } else {
      setTimeout(() => this.globalService.printData('#print-summary'), 200);
    }
  }
}
