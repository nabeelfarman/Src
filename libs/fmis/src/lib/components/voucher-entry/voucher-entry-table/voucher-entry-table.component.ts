import { Component, Input, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, VoucherTableInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

declare var $: any;

@Component({
  selector: 'society-voucher-entry-table',
  templateUrl: './voucher-entry-table.component.html',
  styleUrls: ['./voucher-entry-table.component.scss']
})
export class VoucherEntryTableComponent implements OnInit {

  @Input() bankID: any;
  @Input() lblTax: any;
  lblTransaction: string = '';

  pageFields: VoucherTableInterface = {
    bankId: '',
    spType: '',
    userId: '',
    coaId: '',
    partyId: '',
    debit: '',
    credit: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.bankId,
      msg: 'select bank',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.coaId,
      msg: 'select account head',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.partyId,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.debit,
      msg: 'enter debit',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.credit,
      msg: 'enter credit',
      type: 'textBox',
      required: false,
    }
  ];

  coaList: any = [];
  partyList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getChartOfAccount();
    this.getExternalParties();
  }

  getChartOfAccount(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccount', '').subscribe((response: any) => {
      this.coaList = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getExternalParties(){
    this.dataService.getHttp('fmis-api/ExternalParties/getExternalParties', '').subscribe((response: any) => {
      this.partyList = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }

  save(){

    if(this.lblTax == ""){
      this.valid.apiErrorResponse("enter tax info");
      return;
    }

    if(this.formFields[5].value == "" && this.formFields[6].value == ""){
      this.valid.apiErrorResponse('enter debit'); return;
    }else if(this.formFields[5].value == "" && this.formFields[6].value != ""){
      this.formFields[5].value = '0';
    }else if(this.formFields[5].value != "" && this.formFields[6].value == ""){
      this.formFields[6].value = '0';
    }

    this.formFields[0].value = this.bankID;
    this.formFields[1].value = "insert"

    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'fmis-api/Voucher/saveVoucher'
    )
    .subscribe(
      (response: any[]) => {
        if(response[0].includes('Voucher No Created') == true){
          this.valid.apiInfoResponse('record added successfully');
          // this.plotsTable.getPlots();
          this.lblTransaction = 'Success';
          this.reset();
        }else{
          this.valid.apiErrorResponse(response.toString());
        }
      },
      (error: any) => {
        this.error = error;
        this.valid.apiErrorResponse(this.error);
      }
    );

  }

  openModal(){

    if(
      this.formFields[3].value == '' ||
      this.formFields[4].value == '' ||
      (this.formFields[5].value == '' &&
      this.formFields[6].value == '')){
        this.valid.apiErrorResponse("enter row data");return;
      }else{
        $("#taxModal").modal("show");
      }
    // data-bs-toggle="modal"
    // data-bs-target="#taxModal"
  }
  reset(){
    // this.formFields = this.valid.resetFormFields(this.formFields);
  }
}
