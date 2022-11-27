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
  voucherType: any = "";

  voucherList: any = [];
  error: any;

  pageFields: UnsupervisedInterface = {
    invoiceNo: '0',
    userID: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.invoiceNo,
      msg: 'select voucher no',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.userID,
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

  getVoucherNo(){

    if(this.dtpVoucherDate != '' && this.voucherType != ''){

      var convertDate = this.datepipe.transform(this.dtpVoucherDate, 'yyyy-MM-dd');

      this.dataService
      .getHttp('core-api/getVoucherWithDate?Vtype=' + this.voucherType + '&VDate=' + convertDate, '')
      .subscribe(
        (response: any) => {
          this.voucherList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  getVoucherDetail(item: any){
    this.dataService
    .getHttp('core-api/getSpecificVocherDetail?invoiceno=' + item, '')
    .subscribe(
      (response: any) => {
        this.supervisedTable.tableData = response;
        
        this.supervisedTable.totalDebit = 0;
        this.supervisedTable.totalCredit = 0;
        
        this.supervisedTable.partyName = response[0].partyName;
        this.supervisedTable.description = response[0].invoiceDescription;
        
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
      .receivedtHttp(this.pageFields, this.formFields, 'core-api/approveVoucher')
      .subscribe(
        (response: any) => {
          console.log(response.msg);
          if (response.msg == 'Voucher Supervise Successfully') {
            this.valid.apiInfoResponse('Voucher Supervise Successfully');
            this.reset();
          } else {
            this.valid.apiErrorResponse(response.msg);
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
    this.formFields[0].value = '0';
    this.dtpVoucherDate = '';
    this.voucherType = '';
    this.voucherList = [];
    this.supervisedTable.voucherNo = '';
    this.supervisedTable.tableData = [];

    this.supervisedTable.totalDebit = 0;
    this.supervisedTable.totalCredit = 0;
    
    this.supervisedTable.partyName = '';
    this.supervisedTable.description = '';
        
  }
}
