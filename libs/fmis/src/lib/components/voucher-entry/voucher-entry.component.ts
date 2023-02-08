import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import {
  MyFormField,
  VoucherInterface,
  VoucherModalInterface,
} from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { InstallmentVoucherPrintComponent } from './installment-voucher-print/installment-voucher-print.component';
import { SavedVoucherTableComponent } from './saved-voucher-table/saved-voucher-table.component';
import { TransactionTaxInfoComponent } from './transaction-tax-info/transaction-tax-info.component';
import { VoucherEntryTableComponent } from './voucher-entry-table/voucher-entry-table.component';

@Component({
  selector: 'society-voucher-entry',
  templateUrl: './voucher-entry.component.html',
  styleUrls: ['./voucher-entry.component.scss'],
})
export class VoucherEntryComponent implements OnInit {
  @ViewChild(SavedVoucherTableComponent) voucherTbl: any;
  @ViewChild(VoucherEntryTableComponent) voucherMainTbl: any;
  @ViewChild(TransactionTaxInfoComponent) tranTax: any;

  @ViewChild(InstallmentVoucherPrintComponent) voucherPrint: any;

  searchParty: any = '';

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
    InvType: '', //0
    spType: '', //1
    UserID: '', //2
    BranchID: '', //3
    InvoiceDate: '0', //4
    ProjectID: '', //5
    RefCOAID: '', //6
    PartyID: '', //7
    InvoiceDetail: '', //8
    InvoiceDescription: '', //9
    Amount: '', //10
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.InvType,
      msg: 'Please select voucher type',
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
      msg: 'Select branch',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.InvoiceDate,
      msg: 'Please select voucher date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.ProjectID,
      msg: 'Select project',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.RefCOAID,
      msg: 'Select reference chart of account',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.PartyID,
      msg: 'Select party',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.InvoiceDetail,
      msg: 'Enter debit or credit amount data',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.InvoiceDescription,
      msg: 'Enter Narration',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.Amount,
      msg: 'Please enter amount',
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
    },
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
      trnType: 'Payment',
    },
    {
      trnTypeId: 'Rec',
      trnType: 'Receipt',
    },
    {
      trnTypeId: 'Adj',
      trnType: 'Adjustment',
    },
  ];

  projectList: any = [];
  bankList: any = [];
  partyList: any = [];
  refCoaList: any = [];

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

    this.formFields[4].value = new Date();

    this.getBankAccount();
    this.getProject();
    this.getSavedVoucher('oninit', 1);
    this.getRefCOA();
  }

  getBankAccount() {
    this.dataService.getHttp('core-api/getBank', '').subscribe(
      (response: any) => {
        this.bankList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getRefCOA() {
    this.dataService
      .getHttp('core-api/GetVoucherCBCOA?Type=' + this.rdbType, '')
      .subscribe(
        (response: any) => {
          this.refCoaList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getSavedVoucher(item: any, value: any) {
    this.dataService.getHttp('core-api/GetSavedVoucherDetail', '').subscribe(
      (response: any) => {
        this.voucherTbl.tableData = response;
        if (item == 'save') {
          this.printsaveData(value);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getProject() {
    this.dataService.getHttp('core-api/getProject', '').subscribe(
      (response: any) => {
        this.projectList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getExternalParties() {
    this.formFields[7].value = '';
    this.dataService
      .getHttp(
        'core-api/GetVoucherParty?VoucherType=' + this.formFields[0].value,
        ''
      )
      .subscribe(
        (response: any) => {
          this.voucherMainTbl.partyList = response.reverse();
          this.partyList = response.reverse();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getChartOfAccount() {
    this.dataService
      .getHttp(
        'core-api/GetVouchercoa?VoucherType=' +
          this.formFields[0].value +
          '&AmountType=' +
          this.rdbType,
        ''
      )
      .subscribe(
        (response: any) => {
          this.voucherMainTbl.coaList = response.reverse();

          this.formFields[6].value = '';
          this.formFields[7].value = '';
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onTypeChange(item: any) {
    this.voucherMainTbl.lblDebit = '0';
    this.voucherMainTbl.lblCredit = '0';
    if (item == 'Pay') {
      this.voucherMainTbl.disableCredit = true;
      this.voucherMainTbl.disableDebit = false;
    } else if (item == 'Rec') {
      this.voucherMainTbl.disableCredit = false;
      this.voucherMainTbl.disableDebit = true;
    } else if (item == 'Adj') {
      this.voucherMainTbl.disableCredit = false;
      this.voucherMainTbl.disableDebit = false;
    }
  }

  bankChange(item: any) {
    this.bankID = item;
  }

  checkTableLength(item: any) {
    this.lblTableLength = item;
  }

  save(printSection: any) {
    this.voucherPrint.tableData = [];
    // this.lblTax = "Success";
    this.formFields[1].value = 'Save';
    this.formFields[3].value = '1';
    this.formFields[10].value = '0';

    // if (this.rdbType == 'Cash') {
    //   this.formFields[6].value = '0';
    // } else if (this.rdbType == 'Bank') {
    //   if (this.formFields[6].value == '') {
    //     this.valid.apiInfoResponse('Plese select bank');
    //     return;
    //   } else if (this.formFields[7].value == '') {
    //     this.valid.apiInfoResponse('Please enter bank receipt no');
    //     return;
    //   }
    // }

    if (this.voucherMainTbl.tableData.length > 0) {
      this.formFields[8].value = JSON.stringify(this.voucherMainTbl.tableData);
    }

    if (this.formFields[0].value == 'Adj') {
      if (this.voucherMainTbl.lblDebit != this.voucherMainTbl.lblCredit) {
        this.valid.apiInfoResponse('Debit and credit amount not matched');
        return;
      }
    }

    if (this.formFields[0].value != 'Adj') {
      if (this.formFields[6].value == '') {
        this.valid.apiInfoResponse('please select reference chart of account');
        return;
      } else if (this.formFields[7].value == '') {
        this.valid.apiInfoResponse('please select party');
        return;
      }
    } else {
      this.formFields[6].value = '0';
      this.formFields[7].value = '0';
    }

    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/InsertVoucher')
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.msg == 'Data Saved Successfully') {
            this.valid.apiInfoResponse('record added successfully');

            // var partyData = this.partyList.filter(
            //   (n: { partyID: any }) => n.partyID == this.formFields[7].value
            // );

            // var projectData = this.projectList.filter(
            //   (m: { projectID: any }) => m.projectID == this.formFields[5].value
            // );

            // if (this.rdbType == 'Bank') {
            //   var bankData = this.bankList.filter(
            //     (x: { bankID: any }) => x.bankID == this.formFields[6].value
            //   );

            //   this.voucherPrint.lblBank =
            //     bankData[0].bankName + ' - ' + bankData[0].bankAccountNo;
            //   // this.voucherPrint.lblBankReceipt = this.formFields[7].value;
            // }

            // this.voucherPrint.lblInvoiceNo = response.invNo;
            // this.voucherPrint.lblVoucherType = this.formFields[0].value;
            // this.voucherPrint.lblVoucherDate = this.formFields[4].value;
            // this.voucherPrint.lblAccountType = this.rdbType;
            // this.voucherPrint.lblProject = projectData[0].projectName;
            // this.voucherPrint.lblParty = partyData[0].partyName;
            // this.voucherPrint.tableData = this.voucherMainTbl.tempTableData;

            // this.voucherPrint.lblDebit = this.voucherMainTbl.lblDebit;
            // this.voucherPrint.lblCredit = this.voucherMainTbl.lblCredit;
            // this.voucherPrint.lblDescription = this.formFields[9].value;

            // setTimeout(() => this.printsaveData(response.invNo), 200);

            this.reset();
            this.getSavedVoucher('save', response.invNo);
          } else {
            this.valid.apiErrorResponse(response.msg.toString());
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

    if (
      this.formFieldsModal[4].value == '' &&
      this.formFieldsModal[5].value == ''
    ) {
      this.valid.apiErrorResponse('enter debit');
      return;
    } else if (
      this.formFieldsModal[4].value == '' &&
      this.formFieldsModal[5].value != ''
    ) {
      this.formFieldsModal[4].value = '0';
    } else if (
      this.formFieldsModal[4].value != '' &&
      this.formFieldsModal[5].value == ''
    ) {
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
          if (response[0].includes('Success') == true) {
            this.valid.apiInfoResponse('record added successfully');
            // this.plotsTable.getPlots();
            this.lblTax = 'Success';
            this.resetTrans();
          } else {
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
    this.voucherMainTbl.formFields = this.valid.resetFormFields(
      this.voucherMainTbl.formFields
    );
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFieldsModal = this.valid.resetFormFields(this.formFieldsModal);

    this.voucherMainTbl.formFields[5].value = new Date();
    this.voucherMainTbl.formFields[6].value = '';

    this.tranTax.cmbTax = '';
    this.tranTax.cmbSTax = '';
    this.tranTax.lblNature = '';

    this.formFields[6].value = '';
    this.formFields[7].value = '';

    this.voucherMainTbl.bankID = '';
    this.voucherMainTbl.lblTax = '';
    this.voucherMainTbl.lblTransaction = '';
    this.voucherMainTbl.lblDebit = '0';
    this.voucherMainTbl.lblCredit = '0';
    this.voucherMainTbl.tableData = [];
    this.voucherMainTbl.tempTableData = [];
    this.voucherMainTbl.coaList = [];
    this.voucherMainTbl.partyList = [];
    this.partyList = [];

    this.formFields[4].value = new Date();

    this.voucherMainTbl.disableCredit = false;
    this.voucherMainTbl.disableDebit = false;

    this.lblTableLength = 0;
  }

  resetTrans() {}

  printData(item: any) {
    // var partyData = this.partyList.filter((n: {partyID: any}) => n.partyID == this.formFields[8].value);
    var projectData = this.projectList.filter(
      (m: { projectID: any }) => m.projectID == item.item.projectID
    );

    if (item.item.bankID > 0) {
      var bankData = this.bankList.filter(
        (x: { bankID: any }) => x.bankID == item.item.bankID
      );

      this.voucherPrint.lblBank = bankData[0].bankName; // + ' (' + bankData[0].bankAccountNo + ')';

      if (item.item.bankReceiptNo == '' || item.item.bankReceiptNo == null) {
        this.voucherPrint.lblBankReceipt = '-';
      } else {
        this.voucherPrint.lblBankReceipt = item.item.bankReceiptNo;
      }

      this.voucherPrint.lblAccountType = 'Bank';
    } else {
      this.voucherPrint.lblAccountType = 'Cash';
    }

    this.voucherPrint.lblInvoiceNo = item.item.invoiceNo;
    this.voucherPrint.lblVoucherType = item.item.invType;
    this.voucherPrint.lblVoucherDate = item.item.invoiceDate;
    this.voucherPrint.lblParty = item.item.partyName;

    if (
      item.item.invoiceDescription == '' ||
      item.item.invoiceDescription == null
    ) {
      this.voucherPrint.lblDescription = '-';
    } else {
      this.voucherPrint.lblDescription = item.item.invoiceDescription;
    }

    if (projectData.length > 0) {
      this.voucherPrint.lblProject = projectData[0].projectName;
    } else {
      this.voucherPrint.lblProject = '-';
    }

    this.voucherPrint.lblDebit = 0;
    this.voucherPrint.lblCredit = 0;
    this.voucherPrint.tableData = [];
    for (var i = 0; i < item.response.length; i++) {
      this.voucherPrint.tableData.push({
        accHead: item.response[i].coaTitle,
        accountCode: item.response[i].accountCode,
        partyName: item.response[i].partyName,
        Debit: item.response[i].debit,
        Credit: item.response[i].credit,
      });
      if (item.response[i].debit > 0) {
        this.voucherPrint.lblDebit =
          parseInt(this.voucherPrint.lblDebit) +
          parseInt(item.response[i].debit);
      }
      if (item.response[i].credit > 0) {
        this.voucherPrint.lblCredit =
          parseInt(this.voucherPrint.lblCredit) +
          parseInt(item.response[i].credit);
      }
    }

    setTimeout(() => this.globalService.printData('#print-summary'), 200);
  }

  printsaveData(item: any) {
    var data = this.voucherTbl.tableData.filter(
      (x: { invoiceNo: any }) => x.invoiceNo == item
    );
    // alert(item);
    // alert(data.length);
    // console.log(data);
    // console.log(this.voucherTbl.tableData);

    var projectData = this.projectList.filter(
      (m: { projectID: any }) => m.projectID == data[0].projectID
    );

    this.dataService
      .getHttp('core-api/GetSpecificVocherDetail?InvoiceNo=' + item, '')
      .subscribe(
        (response: any) => {
          this.voucherPrint.lblInvoiceNo = item;
          this.voucherPrint.lblVoucherType = data[0].invType;
          this.voucherPrint.lblVoucherDate = data[0].invoiceDate;
          // this.voucherPrint.lblAccountType = this.rdbType;
          if (projectData.length > 0) {
            this.voucherPrint.lblProject = projectData[0].projectName;
          }
          this.voucherPrint.lblParty = data[0].partyName;

          this.voucherPrint.lblDebit = 0;
          this.voucherPrint.lblCredit = 0;
          this.voucherPrint.tableData = [];

          for (var i = 0; i < response.length; i++) {
            this.voucherPrint.tableData.push({
              accHead: response[i].coaTitle,
              accountCode: response[i].accountCode,
              partyName: response[i].partyName,
              Debit: response[i].debit,
              Credit: response[i].credit,
            });
            if (response[i].debit > 0) {
              this.voucherPrint.lblDebit =
                parseInt(this.voucherPrint.lblDebit) +
                parseInt(response[i].debit);
            }
            if (response[i].credit > 0) {
              this.voucherPrint.lblCredit =
                parseInt(this.voucherPrint.lblCredit) +
                parseInt(response[i].credit);
            }
          }

          this.voucherPrint.lblDescription = data[0].invoiceDescription;

          setTimeout(() => this.globalService.printData('#print-summary'), 200);

          // console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  delete(item: any) {
    this.getSavedVoucher('delete', 1);
  }
}
