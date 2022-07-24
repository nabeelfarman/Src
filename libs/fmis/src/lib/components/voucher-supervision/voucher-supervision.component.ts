import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { MyFormField, UnsupervisedInterface } from '@society/shared/interface';
import { VoucherEntryViewComponent } from './voucher-entry-view/voucher-entry-view.component';
@Component({
  selector: 'society-voucher-supervision',
  templateUrl: './voucher-supervision.component.html',
  styleUrls: ['./voucher-supervision.component.scss'],
})
export class VoucherSupervisionComponent implements OnInit {

  @ViewChild(VoucherEntryViewComponent) supervisedTable: any;

  dtpVoucherDate: any = "";

  voucherList: any = [];
  error: any;

  pageFields: UnsupervisedInterface = {
    trnId: '0',
    userid: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.trnId,
      msg: 'select voucher no',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.userid,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ]
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Voucher Supervision');
    this.formFields[1].value = this.globalService.getUserId().toString();

  }

  getUnsupervisedTransaction(item: any){

    var convertDate = this.datepipe.transform(item, 'yyyy-MM-dd');

    this.dataService
    .getHttp('fmis-api/VoucherSupervision/getUnsupervisedTransaction?voucherDate=' + convertDate, '')
    .subscribe(
      (response: any) => {
        this.voucherList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getVoucherDetail(item: any){

    var data = this.voucherList.filter((x: {trnId: any}) => x.trnId == item);

    this.supervisedTable.partyName = data[0].partyName;
    this.supervisedTable.description = data[0].trnDescription;
    this.supervisedTable.voucherNo = data[0].voucherNo;
    this.dataService
    .getHttp('fmis-api/Voucher/getVoucherDetail?trnID=' + item, '')
    .subscribe(
      (response: any) => {
        this.supervisedTable.tableData = response;

        this.supervisedTable.totalDebit = 0;
        this.supervisedTable.totalCredit = 0;

        for(var i = 0; i < response.length; i++){

          this.supervisedTable.totalDebit += response[i].debit;
          this.supervisedTable.totalCredit += response[i].credit;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(){
    this.dataService
      .receivedtHttp(this.pageFields, this.formFields, 'fmis-api/VoucherSupervision/saveTransaction')
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            this.valid.apiInfoResponse('Record saved successfully');
            this.reset();
          } else {
            this.valid.apiErrorResponse(response[0]);
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.dtpVoucherDate = '';
    this.voucherList = [];
    this.supervisedTable.partyName = '';
    this.supervisedTable.description = '';
    this.supervisedTable.totalDebit = 0;
    this.supervisedTable.totalCredit = 0;
    this.supervisedTable.voucherNo = '';
    this.supervisedTable.tableData = [];
    
  }
}
