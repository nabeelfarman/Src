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
  searchHead: any ='';

  lblOpening: any = 0;
  lblPerodic: any = 0;
  lblClosing: any = 0;

  pageFields: LedgerInterface = {
    coaId: '0',
    userId: '',
    dtpFrom: '',
    dtpTo: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.coaId,
      msg: 'select head of account',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.dtpFrom,
      msg: 'select from date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.dtpTo,
      msg: 'select to date',
      type: 'date',
      required: true,
    },
  ];

  coaList: any = [];

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Ledger Report');
    this.formFields[1].value = this.globalService.getUserId().toString();

    this.getChartOfAccount();
  }

  getChartOfAccount(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccount', '').subscribe((response: any) => {
      this.coaList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  save() {
    
    this.dataService
      .receivedtHttp(this.pageFields, this.formFields, 'fmis-api/Ledger/generateReport')
      .subscribe(
        (response: any) => {
          this.ledgerTable.tableData = JSON.parse(response);

          var debit: any = 0;
          var credit: any = 0;
          var opening: any = 0;

          for(var i=0; i<this.ledgerTable.tableData.length; i++){
            debit += parseInt(this.ledgerTable.tableData[i].Debit);
            credit += parseInt(this.ledgerTable.tableData[i].Credit);
            opening += parseInt(this.ledgerTable.tableData[i].Opening);
          }

          this.lblOpening = opening;
          this.lblPerodic = debit - credit;
          this.lblClosing = this.lblOpening - (-1 * this.lblPerodic);
          
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset() {
    
    this.lblOpening = 0;
    this.lblPerodic = 0;
    this.lblClosing = 0;
  }
}
