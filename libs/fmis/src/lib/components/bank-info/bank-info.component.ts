import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { BankInfoInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { BankInfoTableComponent } from './bank-info-table/bank-info-table.component';

@Component({
  selector: 'society-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {

  @ViewChild(BankInfoTableComponent) bankTable: any;

  pageFields: BankInfoInterface = {
    newBankId: '0',
    spType: '',
    userId: '',
    coaID: '',
    openingDate: '',
    bankNameID: '',
    branchCode: '',
    branchName: '',
    bankTypeID: '',
    titleofAccount: '',
    accountNo: '',
    openingBalance: '',
    description: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.newBankId,
      msg: '',
      type: 'hidden',
      required: false,
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
      value: this.pageFields.coaID,
      msg: 'select bank head of account',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.openingDate,
      msg: 'select opening date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.bankNameID,
      msg: 'select bank name',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.branchCode,
      msg: 'enter branck code',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.branchName,
      msg: 'enter branch name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.bankTypeID,
      msg: 'select account type',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.titleofAccount,
      msg: 'enter account title',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.accountNo,
      msg: 'enter account no',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.openingBalance,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.description,
      msg: '',
      type: 'textBox',
      required: false,
    },
  ];

  bankList: any = [];
  bankCOAccountList: any = [];
  bankTypeList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Banks Information');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getBankName();
    this.getBankChartOfAccount();
    this.getBankType();

  }
  
  getBankName() {
    this.dataService.getHttp('fmis-api/BankAccount/getBankName', '').subscribe(
      (response: any) => {
        this.bankList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBankChartOfAccount() {
    this.dataService.getHttp('fmis-api/BankAccount/getBankChartOfAccount', '').subscribe(
      (response: any) => {
        this.bankCOAccountList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBankType() {
    this.dataService.getHttp('fmis-api/BankAccount/getBankType', '').subscribe(
      (response: any) => {
        this.bankTypeList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  saveBanks() {

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'fmis-api/BankAccount/saveBanks'
      )
      .subscribe(
        (response: any[]) => {
          console.log(response);
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Plot updated successfully');
            }else{
              this.valid.apiInfoResponse('Plot added successfully');
            }
            this.bankTable.getBankAccount();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
  }
      
  edit(item: any) {
    
    this.formFields[0].value = item.bankId;
    this.formFields[3].value = item.coaId;
    this.formFields[4].value = new Date(item.openingDate);
    this.formFields[5].value = item.bankNameId;
    this.formFields[6].value = item.branchCode.toString();
    this.formFields[7].value = item.branchName;
    this.formFields[8].value = item.bankTypeId;
    this.formFields[9].value = item.titleofAccount;
    this.formFields[10].value = item.accountNo;
    this.formFields[11].value = item.openingBalance;
    this.formFields[12].value = item.description;
    
  }
}
