import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { BalanceSheetTableComponent } from './balance-sheet-table/balance-sheet-table.component';

@Component({
  selector: 'society-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss'],
})
export class BalanceSheetComponent implements OnInit {
  @ViewChild(BalanceSheetTableComponent) balanceSheetTbl: any;

  dtpDate: any = '';

  constructor(
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Balance Sheet');

    this.dtpDate = new Date();
  }

  showReport() {
    this.balanceSheetTbl.lblCurrentYear = this.dtpDate.getFullYear();
    this.balanceSheetTbl.lblOldYear = this.dtpDate.getFullYear() - 1;

    this.dataService
      .getHttp(
        'core-api/GetMainBalanceSheet?ToDate=' +
          this.datePipe.transform(this.dtpDate, 'yyyy-MM-dd'),
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.balanceSheetTbl.nonCurAssetList = [];
          this.balanceSheetTbl.curAssetList = [];
          this.balanceSheetTbl.shareCapList = [];
          this.balanceSheetTbl.nonCurliabilityList = [];
          this.balanceSheetTbl.curLiabilityList = [];

          this.balanceSheetTbl.lblONonCurAssetTotal = 0;
          this.balanceSheetTbl.lblNNonCurAssetTotal = 0;
          this.balanceSheetTbl.lblOCurAssetTotal = 0;
          this.balanceSheetTbl.lblNCurAssetTotal = 0;
          this.balanceSheetTbl.lblOAssetTotal = 0;
          this.balanceSheetTbl.lblNAssetTotal = 0;
          this.balanceSheetTbl.lblOTotalLiability = 0;
          this.balanceSheetTbl.lblNTotalLiability = 0;

          for (var i = 0; i < response.length; i++) {
            if (response[i].noteID >= 1 && response[i].noteID <= 10) {
              this.balanceSheetTbl.nonCurAssetList.push({
                noteID: response[i].noteID,
                noteTitle: response[i].noteTitle,
                oTotal: response[i].oTotal,
                nTotal: response[i].nTotal,
              });
              this.balanceSheetTbl.lblONonCurAssetTotal += response[i].oTotal;
              this.balanceSheetTbl.lblNNonCurAssetTotal += response[i].nTotal;

              this.balanceSheetTbl.lblOAssetTotal += response[i].oTotal;
              this.balanceSheetTbl.lblNAssetTotal += response[i].nTotal;
            } else if (response[i].noteID >= 11 && response[i].noteID <= 20) {
              this.balanceSheetTbl.curAssetList.push({
                noteID: response[i].noteID,
                noteTitle: response[i].noteTitle,
                oTotal: response[i].oTotal,
                nTotal: response[i].nTotal,
              });
              this.balanceSheetTbl.lblOCurAssetTotal += response[i].oTotal;
              this.balanceSheetTbl.lblNCurAssetTotal += response[i].nTotal;

              this.balanceSheetTbl.lblOAssetTotal += response[i].oTotal;
              this.balanceSheetTbl.lblNAssetTotal += response[i].nTotal;
            } else if (response[i].noteID >= 21 && response[i].noteID <= 30) {
              this.balanceSheetTbl.shareCapList.push({
                noteID: response[i].noteID,
                noteTitle: response[i].noteTitle,
                oTotal: response[i].oTotal,
                nTotal: response[i].nTotal,
              });
              this.balanceSheetTbl.lblOTotalLiability += response[i].oTotal;
              this.balanceSheetTbl.lblNTotalLiability += response[i].nTotal;
            } else if (response[i].noteID >= 31 && response[i].noteID <= 35) {
              this.balanceSheetTbl.nonCurliabilityList.push({
                noteID: response[i].noteID,
                noteTitle: response[i].noteTitle,
                oTotal: response[i].oTotal,
                nTotal: response[i].nTotal,
              });
              this.balanceSheetTbl.lblOTotalLiability += response[i].oTotal;
              this.balanceSheetTbl.lblNTotalLiability += response[i].nTotal;
            } else if (response[i].noteID >= 36 && response[i].noteID <= 40) {
              this.balanceSheetTbl.curLiabilityList.push({
                noteID: response[i].noteID,
                noteTitle: response[i].noteTitle,
                oTotal: response[i].oTotal,
                nTotal: response[i].nTotal,
              });
              this.balanceSheetTbl.lblOTotalLiability += response[i].oTotal;
              this.balanceSheetTbl.lblNTotalLiability += response[i].nTotal;
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }
}
