import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, VoucherInterface, VoucherModalInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { TransactionTaxInfoComponent } from './transaction-tax-info/transaction-tax-info.component';
import { VoucherEntryTableComponent } from './voucher-entry-table/voucher-entry-table.component';

@Component({
  selector: 'society-voucher-entry',
  templateUrl: './voucher-entry.component.html',
  styleUrls: ['./voucher-entry.component.scss'],
})
export class VoucherEntryComponent implements OnInit {

  @ViewChild(VoucherEntryTableComponent) voucherMainTbl: any;
  @ViewChild(TransactionTaxInfoComponent) tranTax: any;
  
  bankID: string = '';
  lblTax: string = '';
  cmbBank: string = '';
  // cmbTax: string = '';

  pageFieldsModal: VoucherModalInterface = {
    coaId: '0',
    spType: '',
    userId: '',
    partyId: '',
    debit: '',
    credit: '',
    taxId: '',
  };

  
  pageFields: VoucherInterface = {
    newTEmpTrnDEtailID: '0',
    spType: '',
    userId: '',
    trnTypeId: '',
    trnDate: '',
    beneficiaryId: '',
    trnDescription: '',
  };
  
  formFields: MyFormField[] = [
    {
      value: this.pageFields.newTEmpTrnDEtailID,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsModal.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsModal.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.trnTypeId,
      msg: 'select voucher type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.trnDate,
      msg: 'select voucher date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.beneficiaryId,
      msg: 'select pay to',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.trnDescription,
      msg: '',
      type: '',
      required: false,
    },
  ];

  formFieldsModal: MyFormField[] = [
    {
      value: this.pageFieldsModal.coaId,
      msg: 'select account head',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsModal.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsModal.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsModal.partyId,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsModal.debit,
      msg: 'enter debit',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFieldsModal.credit,
      msg: 'enter credit',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFieldsModal.taxId,
      msg: 'select tax section',
      type: 'selectBox',
      required: true,
    }
  ];

  // pageFields: VoucherInterface = {
  //   coaId: '0',
  //   spType: '',
  //   userId: '',
  //   partyId: '',
  //   debit: '',
  //   credit: '',
  //   taxId: '',
  // };

  voucherTypeList: any = [];
  bankList: any = [];
  externalList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Voucher');
    this.formFieldsModal[2].value = this.globalService.getUserId().toString();
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getVoucherType();
    this.getBankAccount();
    this.getExternalParties();
  }

  getVoucherType(){
    this.dataService.getHttp('fmis-api/Voucher/getVoucherType', '').subscribe((response: any) => {
      this.voucherTypeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getBankAccount(){
  this.dataService.getHttp('fmis-api/BankAccount/getBankAccount', '').subscribe((response: any) => {
    this.bankList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getExternalParties(){
    this.dataService.getHttp('fmis-api/ExternalParties/getExternalParties', '').subscribe((response: any) => {
      this.externalList = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }

  bankChange(item: any){
    this.bankID = item;
  }

  save() {

    // this.lblTax = "Success";
    this.formFields[1].value = 'Save';

    if(this.lblTax == ''){
      this.valid.apiErrorResponse('enter tax information');return;
    }

    if(this.voucherMainTbl.lblTransaction == ''){
      this.valid.apiErrorResponse('enter transaction');return;
    }

    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'fmis-api/Voucher/saveVoucher'
    )
    .subscribe(
      (response: any[]) => {
        if(response[0].includes('Success') == true){
          this.valid.apiInfoResponse('record added successfully');
          // this.plotsTable.getPlots();
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

  saveTax() {
    // this.lblTax = 'ok';

    this.formFieldsModal[0].value = this.voucherMainTbl.formFields[3].value;
    this.formFieldsModal[1].value = 'Insert-Tax';
    this.formFieldsModal[3].value = this.voucherMainTbl.formFields[4].value;
    this.formFieldsModal[4].value = this.voucherMainTbl.formFields[5].value;
    this.formFieldsModal[5].value = this.voucherMainTbl.formFields[6].value;
    this.formFieldsModal[6].value = this.tranTax.cmbTax;

    if(this.formFieldsModal[4].value == "" && this.formFieldsModal[5].value == ""){
      this.valid.apiErrorResponse('enter debit'); return;
    }else if(this.formFieldsModal[4].value == "" && this.formFieldsModal[5].value != ""){
      this.formFieldsModal[4].value = '0';
    }else if(this.formFieldsModal[4].value != "" && this.formFieldsModal[5].value == ""){
      this.formFieldsModal[5].value = '0';
    }

    this.dataService
    .savetHttp(
      this.pageFieldsModal,
      this.formFieldsModal,
      'fmis-api/Voucher/saveVoucher'
    )
    .subscribe(
      (response: any[]) => {
        if(response[0].includes('Success') == true){
          this.valid.apiInfoResponse('record added successfully');
          // this.plotsTable.getPlots();
          this.lblTax = "Success";
          this.resetTrans();
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

  reset() {
    this.voucherMainTbl.formFields = this.valid.resetFormFields(this.voucherMainTbl.formFields);
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFieldsModal = this.valid.resetFormFields(this.formFieldsModal);

    this.voucherMainTbl.formFields[5].value = "";
    this.voucherMainTbl.formFields[6].value = "";
    
    this.tranTax.cmbTax = '';
    this.tranTax.cmbSTax = '';
    this.tranTax.lblNature = '';

    this.formFields[6].value = '';

    this.voucherMainTbl.bankID = '';
    this.voucherMainTbl.lblTax = '';
    this.voucherMainTbl.lblTransaction = '';
  
  }
  
  resetTrans(){}

  print() {}
}
