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
  
  lblTableLength: any = 0;

  rdbType: any = '';
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
    InvType: '',
    spType: '',
    UserID: '',
    BranchID: '',
    InvoiceDate: '0',
    ProjectID: '',
    BankID: '',
    BankReceiptNo: '',
    PartyID: '',
    InvoiceDetail: '',
    InvoiceDescription: '',
    Amount: '',
  };
  
  formFields: MyFormField[] = [
    {
      value: this.pageFields.InvType,
      msg: 'select voucher type',
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
      value: this.pageFields.UserID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.BranchID,
      msg: 'select branch',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.InvoiceDate,
      msg: 'select voucher date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.ProjectID,
      msg: 'select project',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.BankID,
      msg: 'select bank',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.BankReceiptNo,
      msg: 'enter bank receipt no',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.PartyID,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.InvoiceDetail,
      msg: 'enter debit or credit amount data',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.InvoiceDescription,
      msg: 'enter description',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.Amount,
      msg: 'enter amount',
      type: 'textbox',
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

  voucherTypeList: any = [
    {
      trnTypeId: 'Pay',
      trnType: 'Payment'
    },
    {
      trnTypeId: 'Rec',
      trnType: 'Receipt'
    },
    {
      trnTypeId: 'PayAdj',
      trnType: 'Payment Adjustment'
    },
    {
      trnTypeId: 'Rec',
      trnType: 'Receipt Adjustment'
    },
  ];

  projectList: any = [];
  bankList: any = [];
  partyList: any = [];

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

    this.rdbType = 'Cash';
    this.getBankAccount();
    this.getProject();
  }

  getBankAccount(){
  this.dataService.getHttp('core-api/getBank', '').subscribe((response: any) => {
    this.bankList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getProject(){
    this.dataService.getHttp('core-api/getProject', '').subscribe((response: any) => {
      this.projectList = response;
      }, (error: any) => {
        console.log(error);
      });
    }

  getExternalParties(){
    this.dataService.getHttp('core-api/GetVoucherParty?VoucherType=' + this.formFields[0].value, '').subscribe((response: any) => {
      this.voucherMainTbl.partyList = response.reverse();
      this.partyList = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getChartOfAccount(){
    this.dataService.getHttp('core-api/GetVouchercoa?VoucherType=' + this.formFields[0].value + '&AmountType=' + this.rdbType, '').subscribe((response: any) => {
      this.voucherMainTbl.coaList = response.reverse();

    }, (error: any) => {
      console.log(error);
    });
  }

  bankChange(item: any){
    this.bankID = item;
  }

  checkTableLength(item: any){
    this.lblTableLength = item;
  }

  save() {

    // this.lblTax = "Success";
    this.formFields[1].value = 'Save';
    this.formFields[3].value = '1';
    this.formFields[11].value = '0';

    if(this.rdbType == 'Cash'){
      this.formFields[6].value = '0';
    }else if(this.rdbType == 'Bank'){
      if(this.formFields[6].value == ''){
        this.valid.apiInfoResponse('select bank');return;
      }else if(this.formFields[7].value == ''){
        this.valid.apiInfoResponse('enter  bank receipt no');return;
      }
    }

    if(this.voucherMainTbl.tableData.length > 0){
      this.formFields[9].value = JSON.stringify(this.voucherMainTbl.tableData);
    }

    if(this.voucherMainTbl.lblDebit != this.voucherMainTbl.lblCredit){
      this.valid.apiInfoResponse('debit and credit amount not matched');return;
    }

    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'core-api/InsertVoucher'
    )
    .subscribe(
      (response: any) => {
        if(response.msg == 'Data Saved Successfully'){
          this.valid.apiInfoResponse('record added successfully');
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
    this.voucherMainTbl.lblDebit = '0';
    this.voucherMainTbl.lblCredit = '0';
    this.voucherMainTbl.tableData = [];
    this.voucherMainTbl.coaList = [];
    this.voucherMainTbl.partyList = [];
    this.partyList = [];
  
  }
  
  resetTrans(){}

  print() {}
}
